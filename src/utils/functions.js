import { db, auth } from "../utils/firebaseConfig.js"
import { collection, setDoc, doc, getDoc, getDocs, updateDoc, arrayUnion } from "firebase/firestore";


export function stringRegex(string){
    return string.replace(/[^\w]+/g, "")
}

// export function objToString(obj){
//     let string = "";
//     for(const key in obj){
//         if(obj[key].isChecked){
//             string+= `${key} ${obj[key].level}, `
//         }
//     }
//     return string
// }

export function regexUriMagStr(string){
    return string.replace(/\//g, "-");
}

export async function createDocDbWithId(nameCollection, nameDoc, data ){
    await setDoc(doc(db, nameCollection, nameDoc), data);
}

export async function saveArrayElementInDocField(collectionName, docId, fieldName, data){
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
        [fieldName]: arrayUnion({
            ...data,
            createdAt: new Date().toISOString(),
        }),
    });
}

export async function fetchArrayFieldFromDoc(collectionName, docId) {
    const userDoc = await getDoc(doc(db, collectionName, docId));
    if (userDoc.exists()) {
        const data = userDoc.data();
        return data.characters || [];
    }
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

export async function fetchDataById(nameCollection, id, setState = null) {
    try {
        const dataDoc = doc(db, nameCollection, id);
        const dataSnapshot = await getDoc(dataDoc);

        if (dataSnapshot.exists()) {
            const data = dataSnapshot.data();
            if (setState) {
                setState(data);
            }
            return data; // Restituisci i dati per un uso diretto
        } else {
            console.error("Documento non trovato nella collezione:", nameCollection);
            return null;
        }
    } catch (error) {
        console.error("Errore durante il fetch dei dati:", error);
        throw error; // Lancia l'errore se serve gestirlo altrove
    }
}
