import UserService from '../services/user/UserService';
import Response from "../response_control/Response";
import {ChannelRouteCode, UserRouteCode} from "./RouteCode";
import {ResponseCode} from "../response_control/ResponseCode";

const response = new Response();

export default class Router{

    userRoutes = (req:any,res:any) => {
        const body = req.body;
        const routeCode:UserRouteCode = body.code;
        if(routeCode !== undefined) {
            const service = new UserService();
            switch (routeCode) {
                // TODO User操作のコードによる動作制御
                case UserRouteCode.CREATE:
                    service.create(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
                case UserRouteCode.ADD_TOKEN:
                    service.addToken(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
                case UserRouteCode.REMOVE_TOKEN:
                    service.removeToken(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
                case UserRouteCode.UPDATE_TOKEN:
                    service.updateToken(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
                case UserRouteCode.CHANGE_NAME:
                    service.changeName(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
                case UserRouteCode.REMOVE_USER:
                    service.removeUser(body).then(_responseData => {
                        response.send(res, _responseData.responseCode, _responseData.failedCode, null);
                    }).catch();
                    break;
            }
        }else{
            response.send(res,ResponseCode.INCORRECT_CLIENT, null,null);
        }
    }

    channelRoutes = (req:any,res:any) => {
        const routesCode:ChannelRouteCode = req.body.code;
        switch (routesCode) {
            // TODO チャンネル操作のコードによる動作制御
        }
    }

}