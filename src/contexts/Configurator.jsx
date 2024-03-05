import { createContext, useContext, useState } from "react";


const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [legsType, setLegsType] = useState(2);
    const [legsColor, setLegsColor] = useState('#777777');
    const [tableWidth, setTableWidth] = useState(100);

    return <ConfigContext.Provider
        value={{
            legsType,
            legsColor,
            tableWidth,
            setLegsColor,
            setLegsType,
            setTableWidth,
        }}>
        {children}
    </ConfigContext.Provider>
}

export const useConfig = () => useContext(ConfigContext);