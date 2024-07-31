import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState({status: false});

    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo,
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;