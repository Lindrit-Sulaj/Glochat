import { db } from "..";
import { addDoc, collection } from "firebase/firestore";

async function createMessage({ text, photoURL, displayName, uid }: { text: string, photoURL: string, displayName: string, uid: string }) {
  let res;
  
  try {
    res = await addDoc(collection(db, 'messages'), {
      text,
      photoURL,
      displayName,
      uid,
      sentAt: new Date().getTime()
    })
  } catch (err) {
    console.log(err);
  };

  return res;
}

export default createMessage