import React, { createContext, useEffect, useState } from "react";



export default ({ children }) => {
    const [configs, setConfigs] = useState({ category: 'all', sort:'mostupvotes'});
    const [data, setData] = useState('');
    const [selectedData, setSelectedData] = useState('');
    const [comments, setComments] = useState([])
    const statusProps = ['planned', 'in-progress', 'live'];
   
    
    useEffect(() => {
        fetch(`http://localhost:5000/getall/?cat=${configs.category}&sort=${configs.sort}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return setData(data); 
            })
    }, [configs])
    
    return (
        <DataContext.Provider value={{ data, setData, configs, setConfigs, selectedData, setSelectedData, comments, setComments, statusProps }}>
            {children}
        </DataContext.Provider>
    )
}

export const DataContext = createContext();