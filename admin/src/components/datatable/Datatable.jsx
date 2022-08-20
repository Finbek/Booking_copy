import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  const location= useLocation();
  const path= location.pathname.split("/")
  const tableName = path[path.length-1]
  const {data, loading, error, reFetch} =useFetch(`/${tableName}`)
  useEffect(()=>reFetch(), [tableName])
  const [list, setList] =useState();
  useEffect(()=>{setList(data)}, [data])
  const handleDelete = async(id) => {
    try {
      await axios.delete(`/${tableName}/${id}`)
      setList(list.filter((item)=>item._id!==id))
    } catch (err) {

    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
    {loading? ("Loading"):(
      <div className="datatable">
        <div className="datatableTitle">
          {tableName}
          <Link to={`/${tableName}/new/`} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={row=>row._id}
        />
      </div>)
    }
    </>
  );
};

export default Datatable;
