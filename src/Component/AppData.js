import React, { useEffect, useState } from "react";
export const DataAppContext = React.createContext();

const AppData = (props) => {
  const initialState = {
    loginStatus: "",
    name: "",
    showNav:"",
    showSearch:'',
    showProCart:'',
    buyStatus: "false",
    pquantity: "",
    emptyCartStatus: "",
    search: "",
    id: "",
    price: "",
    totalprice: "",
    discount: "",
    deliveryAdd:"",
    cardDetails:"",
    paymentType:"Cash On Delivery",
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
