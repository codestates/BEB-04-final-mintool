import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>({
  accountAddress : "",
  toggleLoginState : ()=>{}
});

export function AppWrapper({ children } : any) {
  const [accountAddress, setAccountAddress] = useState<string>("");


  const sharedState = {
    accountAddress : accountAddress,
    changeAccountAddress : (account : string )=>{setAccountAddress(account)}
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
