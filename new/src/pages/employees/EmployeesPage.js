import React from 'react'
import "./employeespage.scss"
import DataTable from '../../components/dataTable/DataTable'
import {useState, useEffect,useContext} from 'react'
import {collection, getDocs} from "firebase/firestore"
import { db } from '../../utils/firebase';
import { AuthContext } from '../../context/AuthContext';
import Add from '../../components/add/Add'
import "../../components/dataTable/datatable.scss"
function EmployeesPage() {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const {currentUser} = useContext(AuthContext)

  const userId = currentUser.uid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesCollection = collection(db, `users/${userId}/employees`);

        const employeesSnapshot = await getDocs(employeesCollection);

        const employeeData = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEmployeeData(employeeData);
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
          Employees
        </h1>
        <button onClick={()=>setOpen(true)} className='button'>Add Employee</button>
        
      </div>
      <DataTable userId={userId}  pageType={"employees"} slug="employees" columns={columns} rows={employeeData}/>
      {open && <Add slug="employee" pageType={"employees"} userId={userId} columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default EmployeesPage