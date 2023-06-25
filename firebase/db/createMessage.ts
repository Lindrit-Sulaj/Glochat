import { db } from "..";
import { addDoc, collection } from "firebase/firestore";

async function createMessage({ text, photoURL, displayName }: { text: string, photoURL: string, displayName: string }) {
  let res;
  
  try {
    res = await addDoc(collection(db, 'messages'), {
      text,
      photoURL,
      displayName,
    })
  } catch (err) {
    console.log(err);
  };

  return res;
}

export default createMessage