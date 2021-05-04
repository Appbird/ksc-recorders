import firebase from "firebase/app"
import "firebase/firestore"
export type DocViewerRequired = {collection:firebase.firestore.CollectionReference,id?:string,pathStack:string[]}