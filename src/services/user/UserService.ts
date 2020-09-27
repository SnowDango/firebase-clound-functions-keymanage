import * as UserModel from '../../models/user/UserModel';
import {FailedCode, ResponseCode} from "../../response_control/ResponseCode";

const model = new UserModel.default();

export default class UserService {

    //TODO User操作のチャンネル作成

    create = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        const email = body.email;
        const token = body.token;
        const name = body.name;

        if(this.isElement([uid,email,token,name])) {

            const _userIsExist = await this.isExist(body);

            if (!_userIsExist) {
                const _result = await model.create(uid, token, email, name);
                if (_result) {
                    return {responseCode: ResponseCode.SUCCESS, failedCode: null};
                } else {
                    return {responseCode: ResponseCode.SUCCESS, failedCode: FailedCode.DATABASE_ERROR};
                }
            } else {
                return {responseCode: ResponseCode.FAILED, failedCode: FailedCode.ALREADY_EXIST};
            }
        }else{
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }

    private isExist = async (body: any): Promise<boolean> => {
        const uid = body.uid;
        const _user = await model.getUserDataSingle(uid);
        return _user !== undefined;
    }

    addToken = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        const token = body.token;
        if(this.isElement([uid,token])) {
            const _addResult = await model.addValueToList(uid, "tokens", token);
            return this.updateResult(_addResult);
        }else{
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }

    removeToken = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        const token = body.token;
        if(this.isElement([uid,token])) {
            const _removeResult = await model.removeValueToList(uid, "tokens", token);
            return this.updateResult(_removeResult);
        }else{
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }


    updateToken = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        const oldToken = body.old_token;
        const newToken = body.new_token;
        if(this.isElement([uid,oldToken,newToken])) {
            const _addResult = await model.addValueToList(uid, "tokens", newToken);
            if (_addResult === 0) {
                const _removeResult = await model.removeValueToList(uid, "tokens", oldToken);
                return this.updateResult(_removeResult);
            } else {
                return this.updateResult(_addResult);
            }
        }else{
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }

    changeName = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        const newName = body.name;

        if(this.isElement([uid,newName])) {
            const _changeResult = await model.updateValue(uid, "name", newName);
            return this.updateResult(_changeResult);
        }else{
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }

    removeUser = async (body: any):Promise<{responseCode:number,failedCode:number|null}> => {
        const uid = body.uid;
        if(this.isElement([uid])) {
            const _removeResult = await model.remove(uid);
            return this.updateResult(_removeResult);
        }else {
            return {responseCode:ResponseCode.INCORRECT_CLIENT,failedCode:null};
        }
    }

    private updateResult = (result: number):{responseCode:number,failedCode:number|null} => {

        const _returnData: { responseCode: ResponseCode, failedCode: FailedCode | null } = {
            responseCode: ResponseCode.SUCCESS,
            failedCode: null
        };

        switch (result) {
            case 0:
                _returnData["responseCode"] = ResponseCode.SUCCESS;
                _returnData["failedCode"] = null;
                break;
            case 1:
                _returnData["responseCode"] = ResponseCode.FAILED;
                _returnData["failedCode"] = FailedCode.DATABASE_ERROR;
                break;
            case 2:
                _returnData["responseCode"] = ResponseCode.FAILED;
                _returnData["failedCode"] = FailedCode.USER_NOT_FOUND;
                break;
        }
        return _returnData;
    }

    private isElement = (elements:any[]):boolean => {
        const _findResult = elements.find(element => element === undefined||null);
        return _findResult !== undefined;
    }
}