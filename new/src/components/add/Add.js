import React from 'react'
import "./add.scss"
import {addDoc,collection} from "firebase/firestore"
import { db } from '../../utils/firebase';
import { useState } from 'react';
export const Add = (props) => {
  const initialFormData = {
    
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Assume props.userId is the ID of the current user
      const userId = props.userId;
      const pagetype = props.pageType
      const newcollection = collection(db, `users/${userId}/${pagetype}`);
      
      // Add the document to the specific user's employees folder
      await addDoc(newcollection, formData);

      props.setOpen(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
    const handleInputChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  name={column.field}
                  placeholder={column.field}
                  value={formData[column.field] || ''}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
export default Add 