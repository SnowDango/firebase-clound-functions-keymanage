import UserService from '../services/user/UserService';

enum UserRouteCode{
    CREATE,
    UPDATE_TOKEN,
    ADD_TOKEN,
    REMOVE_TOKEN,
    CHANGE_NAME,
    REMOVE_USER
}


enum ChannelRouteCode {
    CREATE,
    UPDATE_KEY,
    CHANGE_PASS,
    ADD_USER
}

export default class Router{

    userRoutes = (req:any,res:any) => {
        const body = req.body;
        const routeCode:UserRouteCode = body.code;
        const service = new UserService();
        switch (routeCode) {
            // TODO User操作のコードによる動作制御
            case UserRouteCode.CREATE:
                service.create(body,res).then().catch();
                break;
            case UserRouteCode.ADD_TOKEN:
                service.addToken(body,res).then().catch();
                break;
            case UserRouteCode.REMOVE_TOKEN:
                service.removeToken(body,res).then().catch();
                break;
            case UserRouteCode.UPDATE_TOKEN:
                service.updateToken(body,res).then().catch();
                break;
            case UserRouteCode.CHANGE_NAME:
                service.changeName(body,res).then().catch();
                break;
            case UserRouteCode.REMOVE_USER:
                service.removeUser(body,res).then().catch();
                break;
        }
    }

    channelRoutes = (req:any,res:any) => {
        const routesCode:ChannelRouteCode = req.body.code;
        switch (routesCode) {
            // TODO チャンネル操作のコードによる動作制御
        }
    }

}