import * as functions from 'firebase-functions';
import * as express from 'express';
import admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const routes = require('./routes/Router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router: express.Router = express.Router();
router.post('/user',(req, res) => {
    routes.userRoutes(req,res);
});

router.post('/channel',(req,res) => {
    routes.channelRoutes(req,res);
});

app.use(router);

exports.keymanage = functions.region("asia-northeast1").https.onRequest(app);
