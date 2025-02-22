import { db, auth } from "../utils/firebaseConfig.js"
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";


export function stringRegex(string){
    return string.replace(/[^\w]+/g, "")
}

export function objToString(obj){
    let string = "";
    for(const key in obj){
        if(obj[key].isChecked){
            string+= `${key} ${obj[key].level}, `
        }
    }
    return string
}

export async function createDocDbWithId(nameCollection, nameDoc, data ){
    await setDoc(doc(db, nameCollection, nameDoc), data);
}

export async function fetchCollectionDataDb(nameCollection, setState, setState2 ){
    try {
        const dataCollection = collection(db, nameCollection); // Nome della collezione in Firestore
        const dataSnapshot = await getDocs(dataCollection);
        const dataList = dataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setState(dataList);
        if(setState2){
            setState2(dataList);
        }
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
