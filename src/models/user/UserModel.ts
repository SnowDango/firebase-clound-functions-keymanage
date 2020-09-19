import {FirestoreSimple} from '@firestore-simple/admin';
import admin from "firebase-admin";

const firestore = admin.firestore();
const USERS_PATH = 'users';

export type User = {
    id:string,
    google_uid:string,
    name:string,
    email:string,
    tokens:string[],
    join_channels:string[]
}

const firestoreSimple = new FirestoreSimple(firestore);
const dao = firestoreSimple.collection<User>({
    path:USERS_PATH,
    encode:(user) => {
        return {
            google_uid:user.google_uid,
            name:user.name,
            email:user.email,
            tokens:user.tokens,
            join_channels:user.join_channels
        }
    },
    decode:(doc) => {
        return {
            id: doc.id,
            google_uid: doc.google_uid,
            name: doc.name,
            email: doc.email,
            tokens: doc.tokens,
            join_channels:doc.join_channels
        }
    }
});

export default class UserModel{

    create =  async (
        uid:string,
        token:string,
        email:string,
        name:string
    ) :Promise<boolean> => {
        const _data = {google_uid:uid,name:name,email:email,tokens:[token],join_channels:[]};
        const _id = await dao.add(_data);
        return !!_id;
    }

    getUserDataSingle = async (
        uid: string
    ):Promise<User | undefined> => {
        const _usersSnap = await dao.where("google_uid","==",uid).fetch();
        console.log(_usersSnap[0]);
        return _usersSnap[0];
    }

    getUserDataList = async (
        uids: string[]
    ):Promise<User[] | undefined> => {
        const  _usersSnap = await dao.where("google_uid","in", uids).fetch();
        console.log(_usersSnap);
        return _usersSnap;
    }

    /*async update(){

    }

    async remove(){

    }*/


    /*async getUserName():string{

    }

    async getToken():string[]{

    }*/
}