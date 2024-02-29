import React from 'react'
import "./storespage.scss"
import DataTable from '../../components/dataTable/DataTable'
import {useState, useEffect,useContext} from 'react'
import {collection, getDocs} from "firebase/firestore"
import { db } from '../../utils/firebase';
import { AuthContext } from '../../context/AuthContext';
import Add from '../../components/add/Add'
import "../../components/dataTable/datatable.scss"

function StoresPage() {
  const [open, setOpen] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const {currentUser} = useContext(AuthContext)
  
  const userId = currentUser.uid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesCollection = collection(db, `users/${userId}/stores`);

        const storesSnapshot = await getDocs(storesCollection);

        const storeData = storesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStoreData(storeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, );
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "storeName",
      type: "string",
      headerName: "Store Name",
      width: 250,
    },
    {
      field: "location",
      type: "string",
      headerName: "Location",
      width: 150,
    },
    {
      field: "status",
      type: "boolean",
      headerName: "Status",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
  ];
  
  return (
    <div className='products'>
      <div className='info'>
        <h1>
          Stores
        </h1>
        <button onClick={()=>setOpen(true)} className='button'>Add Store</button>
      </div>
      <DataTable userId={userId}  pageType={"stores"} slug="stores" columns={columns} rows={storeData}/>
      {open && <Add slug="user" pageType={"stores"} userId={userId} columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default StoresPage