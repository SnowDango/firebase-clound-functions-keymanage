import express from 'express';
import {ResponseCode,FailedCode} from "./ResponseCode";

export default class Response {

    public send(
        res:express.Response,
        state:ResponseCode,
        code:FailedCode|null,
        data:string|null
    ){
        if(data === null){
            if(state === ResponseCode.SUCCESS){
                this.sendSuccess(res);
            }else if(state === ResponseCode.INCORRECT_CLIENT){
                this.sendFailedClient(res);
            }else if(state === ResponseCode.FAILED){
                this.sendFailedServer(res,code);
            }
        }
    }

    private sendSuccess = (
        res:express.Response
    ) => {
        res.status(200);
    }

    private sendFailedServer = (
        res: express.Response,
        code: FailedCode|null ) => {
        res.status(500).json({code:code});
    }

    private sendFailedClient = (
        res:express.Response
    ) => {
        res.status(400);

    }
    public sendKey(
        res:express.Response,
        state:ResponseCode,
        code:FailedCode|null,
        keyState:number,
        message:string
    ){
        const _body = {state:state,code:code,key_state:keyState,message:message};
        if(code === null){
            delete _body.code;
        }
        res.send(_body);
    }
}