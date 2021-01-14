import {createContext, useContext, useState} from 'react';

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext);
}

function AuthContextValue() {
  const [user, setUser] = useState(null);
  return {
    user,
    setUser
  };
}

function AuthContextProvider({children}) {
  const value = AuthContextValue();
  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}

export {
  useAuthContext,
  AuthContextProvider
};
