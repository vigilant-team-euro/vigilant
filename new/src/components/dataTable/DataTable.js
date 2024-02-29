import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { db } from '../../utils/firebase';
import {deleteDoc, doc} from "firebase/firestore"
import { useState } from 'react';

const DataTable = (props) => {
  const [data, setData] = useState([])
  const userId = props.userId;
  const pagetype = props.pageType

  const handleDelete = async (id) => {
    try{
        await deleteDoc(doc(db,`users/${userId}/${pagetype}`, id));
        setData(data.filter((item)=>item.id !== id));
    }catch(err){

    }
  };

  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => (
      <div className="action">
        <Link to={`/${props.slug}/${params.row.id}`}>
          <img src="/view.svg" alt="" />
        </Link>
        <div className="delete" onClick={() => handleDelete(params.row.id)}>
          <img src="/delete.svg" alt="" />
        </div>
      </div>
    ),
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        
      />
    </div>
  );
};

export default DataTable;
