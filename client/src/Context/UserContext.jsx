import { createContext, use, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log("user is ", user);
    let token = localStorage.getItem("token");
console.log("token is in userContext ", token);
  }, [user]);

  let valueObj = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
