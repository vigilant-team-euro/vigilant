import React from 'react'
import { ResponsiveContainer, Treemap } from "recharts";
import { Link, useNavigate } from 'react-router-dom';

function TreeMapBox(props) {
    const navigate = useNavigate();
    const handleClick = (data, index) => {
        navigate(`/storeview/${data.root.name}`);
        console.log('Clicked:', data, index);
      };
    
  return (
    <ResponsiveContainer width="100%" height={300}>
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