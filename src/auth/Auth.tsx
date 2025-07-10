import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase";

interface AuthCredentials {
  email: string;
  password: string;
}

export const login = ({ email, password }: AuthCredentials) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithCredentials = ({
  email,
  password,
}: AuthCredentials) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  return signOut(auth);
};
