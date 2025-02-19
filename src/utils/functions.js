import { db, auth } from "../utils/firebaseConfig.js"
import { collection, setDoc, doc } from "firebase/firestore";


export function stringRegex(string){
    return string.replace(/[^\w]+/g, "")
}

export async function createDocDbWithId(nameCollection, nameDoc, data ){
    await setDoc(doc(db, nameCollection, nameDoc), data);
}
