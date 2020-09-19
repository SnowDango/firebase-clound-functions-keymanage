import express from 'express';

export enum ResponseCode {
    SUCCESS,
    FAILED
}

export enum FailedCode {
    DATABASE_ERROR,
    NO_JOIN_INTO_CHANNEL,
    ALREADY_EXIST,
    USER_NOT_FOUND
}

export default class Response {

    public send(
        res:express.Response,
        state:ResponseCode,
        code:FailedCode|null,
        data:string|null
    ){
        const _body = {state:state,code:code,data:data};
        if(code === null){
            delete _body.code;
        }
        if(data === null){
            delete _body.data;
        }
        res.send(_body);
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