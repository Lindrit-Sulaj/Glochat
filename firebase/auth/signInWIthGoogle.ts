import { auth } from "..";
import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";

const provider = new GoogleAuthProvider()

async function signInWithGoogle() {
  let result, error;

  try { 
    result = await signInWithPopup(auth, provider)
  } catch (err) {
    error = err;
  }

  return { result, error }
}

export default signInWithGoogle