import * as functions from 'firebase-functions';
import * as express from 'express';
import admin from "firebase-admin";
import * as Router from "./routes/Router";

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router: express.Router = express.Router();
router.post('/user',(req:Express.Response, res:Express.Response) => {
    const routes = new Router.default();
    routes.userRoutes(req,res);
});

router.post('/channel',(req,res) => {
    const routes = new Router.default();
    routes.channelRoutes(req,res);
});

app.use(router);

exports.keymanage = functions.region("asia-northeast1").https.onRequest(app);
