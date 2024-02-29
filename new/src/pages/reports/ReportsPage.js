import React from 'react'
import "./reportspage.scss"
import DataTable from '../../components/dataTable/DataTable'
import {useState, useEffect,useContext} from 'react'
import {collection, getDocs} from "firebase/firestore"
import { db } from '../../utils/firebase';
import { AuthContext } from '../../context/AuthContext';
import Add from '../../components/add/Add'
import "../../components/dataTable/datatable.scss"

function ReportsPage() {
  const [open, setOpen] = useState(false);
  const [reportData, setReportData] = useState([]);
  const {currentUser} = useContext(AuthContext)
  
  const userId = currentUser.uid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportCollection = collection(db, `users/${userId}/reports`);

        const reportsSnapshot = await getDocs(reportCollection);

        const reportData = reportsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReportData(reportData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, );
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'profileImage',
        headerName: 'Profile',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.profileImage || '/noavatar.png'} alt=""/>
            
          },
        
      },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 70,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 190,
      editable: true,
    },
    
  ];
  
  return (
    <div className='employees'>
      <div className='info'>
        <h1>
          Reports
        </h1>
        <button onClick={()=>setOpen(true)} className='button'>Add Report</button>
        
      </div>
      <DataTable  userId={userId}  pageType={"reports"} slug="reports" columns={columns} rows={reportData}/>
      {open && <Add slug="user"  pageType={"reports"} userId={userId}  columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default ReportsPage