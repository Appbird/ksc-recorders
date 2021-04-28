import { auth } from "firebase-admin";
/** @throws */
export async function authentication(IDToken:string){
    const result = await auth().verifyIdToken(IDToken);
    return result.uid;
}