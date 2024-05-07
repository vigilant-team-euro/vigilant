import React from 'react'
import { ResponsiveContainer, Treemap } from "recharts";
import {  useNavigate } from 'react-router-dom';
import "./treemap.scss";
function TreeMapBox(props) {
    
    const navigate = useNavigate();
    const handleClick = (data, index) => {
      navigate(`/storeview/${data.storeId}`, { state: { storeName: data.name, storeData:data.storeData } });
      console.log('Clicked:', data.name, data);      
      };
    
  return (
    <ResponsiveContainer width="100%"  className="treemap">
          <Treemap
            data={props.storeRevenues}
            dataKey="size"
            stroke="#ddd"
            
            fill="#4d5b77"
            onClick={handleClick}
          />
        </ResponsiveContainer>
  )
}

export default TreeMapBox