// import React, { useContext, useState } from "react";
// //import firebaseAuth from 'firebaseConfig' (firebaseConfig.js)

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();

//   function signUp(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signUpFirebase,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
