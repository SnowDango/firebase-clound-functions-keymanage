import * as UserModel from '../../models/user/UserModel';
import * as responseController from '../../response_control/Response';

const model = new UserModel.default();
const response = new responseController.default();
const responseCode = responseController.ResponseCode;
const failedCode = responseController.FailedCode;

export default class UserService {

    create = async (body: any,res: any) => {
        const uid = body.uid;
        const email = body.email;
        const token = body.token;
        const name = body.name;

        const _userIsExist = await this.isExist(body);

        if (!_userIsExist) {
            const _result = await model.create(uid,token,email,name);
            if (_result) {
                response.send(
                    res,
                    responseCode.SUCCESS,
                    null,
                    null);
            } else {
                response.send(
                    res,
                    responseCode.FAILED,
                    failedCode.DATABASE_ERROR,
                    null);
            }
        } else {
            response.send(
                res,
                responseCode.FAILED,
                failedCode.ALREADY_EXIST,
                null);
        }
    }

    isExist = async (body: any): Promise<boolean> => {
        const uid = body.uid;
        const _user = await model.getUserDataSingle(uid);
        return _user !== undefined;
    }

    /*async addToken(){

    }

    async removeToken(){

    }

    async updateToken(){

    }

    async updateName(){

    }*/
}