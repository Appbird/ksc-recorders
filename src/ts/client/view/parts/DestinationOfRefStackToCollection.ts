import firebase from "firebase/app";

export class DestinationOfRefStackToCollection {
    private path: RefStackToDoc[];
    private destination: RefStackToCollection;
    constructor(path: RefStackToDoc[], destination: RefStackToCollection) {
        this.path = path;
        this.destination = destination;
    }
    returnToHigher() {
        const pop = this.path.pop();
        if (pop === undefined)
            throw new Error("これ以上上位の改装へ上がれません。");
        this.destination = pop;
        return this;
    }
    goToLower(id: string, collectionName: string) {
        this.path.push({ ...this.destination, id: id });
        this.destination = { collectionName: collectionName };
        return this;
    }
    get reference() {
        let pathToDoc: firebase.firestore.DocumentReference | null = null;
        for (const ele of this.path) {
            pathToDoc = (pathToDoc === null) ?
                firebase.firestore().collection(ele.collectionName).doc(ele.id) : pathToDoc.collection(ele.collectionName).doc(ele.id);
        }
        return (pathToDoc === null) ?
            firebase.firestore().collection(this.destination.collectionName)
            : pathToDoc.collection(this.destination.collectionName);
    }
    get depth() {
        return this.path.length;
    }
}
interface RefStackToDoc {
    collectionName: string;
    id: string;
}
interface RefStackToCollection {
    collectionName: string;
}
