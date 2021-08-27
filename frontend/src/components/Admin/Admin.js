import React, { useState, useEffect } from 'react';
import './Admin.css';
import MaterialTable from 'material-table'
import Header1 from '../Header1/Header';
import axios from 'axios';
import api from 'axios';



function Admin() {
  var [data, setData] = useState();


  useEffect(() => {
    fetchData()
  }, [])

//       *************** FETCH DATA FROM DATABASE AND DISPLAY ON TABLE **************

  const fetchData = () => {
    console.log(data);
    axios.get('http://localhost:4000/books')
      .then(function (response) {
        const data = response.data;
        setData(data);
      })
      .catch(err => {
        console.log(err);
      })
  }

//       *************** CREATE COLUMNS AND APPLY VALIDATION ON EACH OPERATION  **************  
  const columns = [
    {
      title: "Book Ref_id", field: "ref", validate: rowdata => {
        if (rowdata.ref === undefined || rowdata.ref === "") {
          return "Required";
        }
        var letterNumber = /^[0-9]+$/;
        if ((rowdata.ref.match(letterNumber))) {
          return true;
        }
        else {
          return "Id should be Numeric";
        }

      }
    },
    {
      title: "Book Name", field: "name", validate: rowdata => {
        if (rowdata.name === undefined || rowdata.name === "") {
          return "Required";
        }
        var letterNumber = /^[0-9A-Za-z]/;
        if ((rowdata.name.match(letterNumber))) {
          return true;
        }
        else {
          return "Book name should be AlphaNumeric";
        }
      }
    },
    {
      title: "Price($) ", field: "price", validate: rowdata => {
        if (rowdata.price === undefined || rowdata.price === "") {
          return "Required";
        }
        var letterNumber = /^[0-9]+$/;
        if ((rowdata.price.match(letterNumber))) {
          return true;
        }
        else {
          return "Price should be Numeric";
        }
      }
    },
    {
      title: "Category", field: 'catagory', validate: rowdata => {
        if (rowdata.catagory === undefined || rowdata.catagory === "") {
          return "Required";
        }
        var letterNumber = /^[A-Za-z]/;
        if ((rowdata.catagory.match(letterNumber))) {
          return true;
        }
        else {
          return "Catagory should not be Numeric";
        }
      }
    },
    {
      title: "Stock", field: 'stock', validate: rowdata => {
        if (rowdata.stock === undefined || rowdata.stock === "") {
          return "Required";
        }
        var letterNumber = /^[0-9]+$/;
        if ((rowdata.stock.match(letterNumber))) {
          return true;
        }
        else {
          return "Stock should be Numeric";
        }
      }
    }

  ]

//       *************** CALL POST API FOR ADDING DATA  **************

  const handleRowAdd = (newRow, resolve) => {

    const headers = {
      'Content-Type': 'application/json'
    };
    
    axios.post("http://localhost:4000/addbook", newRow, { headers })
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newRow);
        setData(dataToAdd);
        resolve()

      })
      .catch(error => {
        console.log("Error");
        resolve()
      })

  }
  
//       *************** CALL PUT API FOR UPDATING DATA  **************

  const handleRowUpdate = (newData, oldData, resolve) => {

    api.put("http://localhost:4000/book/" + oldData.tableData.id, newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
      })
  }

//       *************** CALL DELETE API FOR DELETING DATA  **************

  const handleRowDelete = (oldData, resolve) => {
    api.delete("http://localhost:4000/book/" + oldData.tableData.id , oldData)
      .then(res => {
        console.log(oldData)
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
  }

  return (
    <div className="App">
      <Header1 />
      <h1 align="center" style={{ marginTop: "20px" }}  >Book Data</h1>
      <h4 align='center'></h4>
      <div className="container-table">
        <MaterialTable
          style={{ zIndex: "0", fontWeight: "bold", boxShadow: "5px 5px 15px -5px black" }}
          title=""
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve) => {
                handleRowAdd(newRow, resolve)
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                api.put("http://localhost:4000/bookes/" + oldData.tableData.id , oldData)
                resolve()
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              })
          }}
          options={{
            actionsColumnIndex: -1, addRowPosition: "first"
          }}
        />
      </div>
    </div>
  );
}

export default Admin;
