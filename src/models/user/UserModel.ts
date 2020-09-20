import {FirestoreSimple} from '@firestore-simple/admin';
import admin from "firebase-admin";

const firestore = admin.firestore();
const USERS_PATH = 'users';
const FieldValue = admin.firestore.FieldValue;

export type User = {
    id:string,
    google_uid:string,
    name:string,
    email:string,
    tokens:string[]
}

const firestoreSimple = new FirestoreSimple(firestore);
const dao = firestoreSimple.collection<User>({
    path:USERS_PATH,
    encode:(user) => {
        return {
            google_uid:user.google_uid,
            name:user.name,
            email:user.email,
            tokens:user.tokens
        }
    },
    decode:(doc) => {
        return {
            id: doc.id,
            google_uid: doc.google_uid,
            name: doc.name,
            email: doc.email,
            tokens: doc.tokens
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
        const _data = {google_uid:uid,name:name,email:email,tokens:[token]};
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
        const  _usersSnap = await dao.where("google_uid","in", uids).limit(1).fetch();
        console.log(_usersSnap);
        return _usersSnap;
    }

    getId = async (
        uid:string
    ):Promise<string|undefined> => {
        const _userSnap = await dao.where("google_uid","==",uid).limit(1).fetch();
        return _userSnap[0].id;
    }

    addValueToList = async (
        uid:string,
        field:string,
        value:string
    ):Promise<number> => {
        const _id = await this.getId(uid);
        if(_id !== undefined ) {
            try {
                await dao.update({
                    id: _id,
                    [field]: FieldValue.arrayUnion(value)
                });
                return 0;
            }catch (e) {
                console.error(e.toString());
                return 1;
            }
        }else{
            return 2;
        }
    }

    removeValueToList = async (
        uid:string,
        field:string,
        value:string
    ):Promise<number> => {
        const _id = await this.getId(uid);
        if(_id !== undefined){
            try{
                await dao.update({
                    id: _id,
                    [field]:FieldValue.arrayRemove(value)
                });
                return 0;
            }catch (e) {
                console.error(e.toString());
                return 1;
            }
        }else{
            return 2;
        }
    }

    updateValue = async (
        uid:string,
        field:string,
        value:string
    ):Promise<number> => {
        const _id = await this.getId(uid);
        if(_id !== undefined){
            try{
                await dao.update({
                    id: _id,
                    [field]:value
                });
                return 0;
            }catch (e) {
                return 1;
            }
        }else{
            return 2;
        }
    }

    remove = async (
        uid:string
    ):Promise<number> => {
        const _id = await this.getId(uid);
        if (_id !== undefined){
            try {
                await dao.delete(_id);
                return 0;
            }catch (e) {
                return 1;
            }
        }else{
            return 2;
        }
    }



    /*async getUserName():string{
    TODO　ユーザー名の取得関数
    }

    async getToken():string[]{
    TODO トークンの取得関数
    }*/
}