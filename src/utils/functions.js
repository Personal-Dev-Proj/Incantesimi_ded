import { db, auth } from "../utils/firebaseConfig.js"
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";


export function stringRegex(string){
    return string.replace(/[^\w]+/g, "")
}

export async function createDocDbWithId(nameCollection, nameDoc, data ){
    await setDoc(doc(db, nameCollection, nameDoc), data);
}


export async function fetchCollectionDataDb(nameCollection, setState ){
    try {
        const dataCollection = collection(db, nameCollection); // Nome della collezione in Firestore
        const dataSnapshot = await getDocs(dataCollection);
        const dataList = dataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setState(dataList);
    } catch (error) {
        console.error("Errore durante il fetch degli incantesimi:", error);

    }
}


export async function fetchDataById (nameCollection, id, setState){
    try {
        const dataDoc = doc(db, nameCollection, id);
        const dataSnapshot = await getDoc(dataDoc);
        if (dataSnapshot.exists()) {
            setState(dataSnapshot.data());
        } else {
            console.error("Incantesimo non trovato");
        }
    } catch (error) {
        console.error("Errore durante il fetch dei dettagli dell'incantesimo:", error);
    }
}
