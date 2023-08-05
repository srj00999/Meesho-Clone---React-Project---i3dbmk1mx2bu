import React, { useEffect, useState } from "react";
export const DataAppContext = React.createContext();

const AppData = (props) => {
  const initialState = {
    loginStatus: 'true',
    name:'',
    pquantity:'',
    totalprice:'',
    emptyCartStatus:'',
    search:''
  };

  const [appState, setAppState] = useState(initialState);
  useEffect(() => {
    console.log("Context Data", appState);
  });

  return (
    <>
      <DataAppContext.Provider value={{ appState, setAppState }}>
        {props.children}
      </DataAppContext.Provider>
    </>
  );
};

export default AppData;
