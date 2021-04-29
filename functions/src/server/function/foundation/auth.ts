import {firebaseAdmin} from "../firebaseAdmin";
/** @throws */
export async function authentication(IDToken:string){
    const result = await firebaseAdmin.auth.verifyIdToken(IDToken);
    return result.uid;
}