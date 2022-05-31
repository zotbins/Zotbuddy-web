import React, { useContext, useState, useEffect } from "react";
import { firebaseAuth, firebaseDb } from "../firebaseConfig"; //(firebaseConfig.js)
import { collection, getDoc } from "firebase/firestore";
//import * as dbMethods from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const user = await firebaseAuth.signInWithEmailAndPassword(email, password);
    const uid = user.user.uid;
    const docSnap = await firebaseDb.collection("users").doc(uid).get();

    if (!docSnap.data().iswebapp) {
      return firebaseAuth.signOut();
    }

    return user;
  };

  const logout = async () => {
    return await firebaseAuth.signOut();
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
    //console.log("unsubscribe");
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
