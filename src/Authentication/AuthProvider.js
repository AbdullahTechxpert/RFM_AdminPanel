import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// const token = AuthenticateAdmin(email, password)

// This function Authenticate Admin
//  const AuthenticateAdmin = (values) => {
//   console.log("values:", values.email, values.password);

//   const auth = getAuth();

//   signInWithEmailAndPassword(auth, values.email, values.password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user.getIdToken().then(async (idToken) => {
//         console.log("userCredential:", idToken);
//         return await idToken;
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// };
