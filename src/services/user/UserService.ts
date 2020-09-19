import * as UserModel from '../../models/user/UserModel';
import * as responseController from '../../response_control/Response';

const model = new UserModel.default();
const response = new responseController.default();
const responseCode = responseController.ResponseCode;
const failedCode = responseController.FailedCode;

export default class UserService {

    //TODO User操作のチャンネル作成

    create = async (body: any,res: any) => {
        const uid = body.uid;
        const email = body.email;
        const token = body.token;
        const name = body.name;

        const _userIsExist = await this.isExist(body);

        if (!_userIsExist) {
            const _result = await model.create(uid,token,email,name);
            if (_result) {
                response.send(res, responseCode.SUCCESS, null, null);
            } else {
                response.send(res, responseCode.FAILED, failedCode.DATABASE_ERROR, null);
            }
        } else {
            response.send(res, responseCode.FAILED, failedCode.ALREADY_EXIST, null);
        }
    }

    private isExist = async (body: any): Promise<boolean> => {
        const uid = body.uid;
        const _user = await model.getUserDataSingle(uid);
        return _user !== undefined;
    }

    addToken = async (body:any,res:any) => {
        const uid = body.uid;
        const token = body.token;
        const _addResult = await model.addValueToList(uid,"tokens",token);
        this.tokenResult(_addResult,res);
    }

    removeToken = async (body:any,res:any) => {
        const uid = body.uid;
        const token = body.token;
        const _removeResult = await model.removeValueToList(uid,"tokens",token);
        this.tokenResult(_removeResult,res);
    }


    updateToken = async (body:any,res:any) => {
        const uid = body.uid;
        const oldToken = body.old_token;
        const newToken = body.new_token;
        const _addResult = await model.addValueToList(uid,"tokens",newToken);
        if(_addResult === 0){
            const _removeResult = await model.removeValueToList(uid,"tokens",oldToken);
            this.tokenResult(_removeResult,res);
        }else{
            this.tokenResult(_addResult,res);
        }
    }

    private tokenResult = (result:number,res:any) => {
        switch (result) {
            case 0:
                response.send(res, responseCode.SUCCESS, null, null);
                break;
            case 1:
                response.send(res, responseCode.FAILED, failedCode.DATABASE_ERROR, null);
                break;
            case 2:
                response.send(res, responseCode.FAILED, failedCode.USER_NOT_FOUND, null);
                break;
        }
    }

    /*
    async updateName(){

    }*/
}