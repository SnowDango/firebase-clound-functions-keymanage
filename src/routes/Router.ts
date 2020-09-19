import UserService from '../services/user/UserService';

enum UserRouteCode{
    CREATE,
    UPDATE_TOKEN,
    ADD_TOKEN,
    REMOVE_TOKEN,
    CHANGE_NAME
}


enum ChannelRouteCode {
    CREATE,
    UPDATE_KEY,
    CHANGE_PASS,
    ADD_USER
}

exports.userRoutes = (req:any,res:any) => {
    const body = req.body;
    const routeCode:UserRouteCode = body.code;
    switch (routeCode) {
        case UserRouteCode.CREATE:
            const service = new UserService();
            service.create(body,res).then().catch();
            break;
    }
}
exports.channelRoutes = (req:any,res:any) => {
    const routesCode:ChannelRouteCode = req.body.code;
    switch (routesCode) {

    }
}