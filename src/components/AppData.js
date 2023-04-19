import React, { useState, useEffect } from "react";
export const DataAppContext = React.createContext();




export default function AppData(props) {
    const initialState = {
        loginStatus:'' ,
        name: '',
        email: '',
        password: '',
        totalCount:'',
        baseFar:'',
    }

    const [appState, setAppState] = useState(initialState);
    useEffect(() => {
        console.log('Context Data - ', appState);
    })
    return (
        <>
            <DataAppContext.Provider value={{ appState, setAppState }}>
                {props.children}
            </DataAppContext.Provider>

        </>
    )
}