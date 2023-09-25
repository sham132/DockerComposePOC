import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AccountCircle, Lock, Phone, CreditCard, Payment } from '@material-ui/icons';
import ReactFileReader from 'react-file-reader';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { CSVLink } from "react-csv";


import './/tab.css';
import logo from '../src/Logo.png';


let arr = [];
export function Verify() {

  const [activeTab, setActiveTab] = useState(1);
  let [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [open, setOpen] = useState(false); // State to control dialog visibility

  let [array, setArray] = useState([]);
  let [data1, setData1] = useState([]);


  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const inputEl = useRef(null);
  const fileReader = new FileReader();

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };  

  const headers = [   
    { label: "TIMESTAMP", key: "timestamp" },
    { label: "MSISDN", key: "msisdn" },
    { label: "CNIC", key: "cnic" },
    { label: "transactionID", key: "transactionID" },
    { label: "Data", key: "data" }
  ];

  const csvreport = {
    data: data1,
    headers: headers,
    filename: 'CMPAData.csv'
  };

  useEffect(() => {





    setTimeout(() => {


    }, 1000);
  });



  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };






  const mediation = (inputString) => {
    const objectStrings = inputString.split('}{');

    // Add missing braces to each object string
    const formattedStrings = objectStrings.map((str, index) => {
      if (index === 0) {
        return str + '}';
      } else if (index === objectStrings.length - 1) {
        return '{' + str;
      } else {
        return '{' + str + '}';
      }
    });

    // Parse each formatted string to convert into objects
    const objects = formattedStrings.map(str => JSON.parse(str));
    return objects;

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const savedItem = await localStorage.getItem("cmpaPayload");
    const parsedItem = JSON.parse(savedItem);
    // Create the request payload

    const payload = {
      userName: parsedItem.username,
      passwd: parsedItem.password,
      cnic: nationalId,
      msisdn: phoneNumber,
      transactionID: `${parsedItem.username + Date.now()}`,
    };

    try {
      // Make the API call
      const response = await fetch('http://localhost:3002/cnic/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse the API response
      const data = await response.json();
      // Update the API response 
      if (data.success == false) {

        setApiResponse(data.message);
      }
      else {

        setApiResponse(data.data);
      }

      // setApiResponse(data.data);
      setOpen(true); // Open the dialog

    } catch (error) {
      // Handle error
      console.error('Error occurred during API call:', error);
      setApiResponse('Error occurred during API call.');
      setOpen(true); // Open the dialog
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleOnSubmit1 = (e) => {
    e.preventDefault();
    window.location.replace('/', null);

  };



  let handleOnSubmit3 = async (e) => {

    e.preventDefault();

    array.forEach(async (data) => {

      const propertyValues = Object.values(data);

      if (propertyValues[1] != undefined || propertyValues[1] != null) {
        setCnic(propertyValues[1].replace('\r', ''));
        const savedItem = await localStorage.getItem("cmpaPayload");
        const parsedItem = JSON.parse(savedItem);
        const payload = {
          userName: parsedItem.username,
          passwd: parsedItem.password,
          cnic: propertyValues[1].replace('\r', ''),
          msisdn: propertyValues[0],
          transactionID: `${parsedItem.username + Math.floor(Math.random() * 1000000000)}`,
        };

        try {
          // Make the API call
          setLoading(true);
          const response = await fetch('http://localhost:3002/cnic/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          // Parse the API response
          const data = await response.body.getReader();

          const decoder = new TextDecoder();

          while (true) {
            const { value, done } = await data.read();
            if (done) {
              setLoading(false);
              break;
            }
            const decodedChunk = decoder.decode(value, { stream: true });
            const objectStrings = decodedChunk.split('}{');
            // Add missing braces to each object string
            const formattedStrings = objectStrings.map((str, index) => {
              if (index === 0) {
                return str + '';
              } else if (index === objectStrings.length - 1) {
                return '{' + str;
              } else {
                return '[{' + str + '}]';
              }
            });

            // Parse each formatted string to convert into objects
            const objects = formattedStrings.map(str => JSON.parse(str));



            data1.push(...objects)

            setLoad(true);

          }
          // Update the API response 
          if (data.success == false) {

            setApiResponse(data.message);
          }
          else {
            setApiResponse(data.data);
          }

          // setApiResponse(data.data);
        } catch (error) {
          // Handle error
          console.error('Error occurred during API call:', error);

        }
      }
    })



  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (file) {

      fileReader.onload = function (event) {
        const text = event.target.result;

        if (text.split("\n").length > 200) {
          alert("CSV file size is greater then 200");
        } else {
          csvFileToArray(text);                            
        }

      };

      fileReader.readAsText(file);
    }
  };

  const handleOnSubmit2 = (e) => {
    e.preventDefault();
    setArray([]);
    setData1([]);
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <Container maxWidth="sm">
      <div style={{ 'padding-left': '600px', 'padding-top': '10px' }}>
        <Button onClick={
          handleOnSubmit1}
          variant="contained"
          color="secondary"


        >
          Logout
        </Button>
      </div>
      <br></br>
      <center><img src={logo} width="100" height="70" /></center>
      <center><h2>CNIC-MSISDN Pairing Authentication</h2></center>


      <div  className="tab_content">
        {activeTab === 1 && <div className="tab_panel">
          <form onSubmit={handleSubmit}>
          <center><h2><b>For Single Query.</b></h2></center>         
            <b> <TextField  
              id="phoneNumber" size='20'
              label="Mobile Number"
              fullWidth
              required
              placeholder=' 3xxyyyyyyy'
              margin="normal"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              InputProps={{
                startAdornment: <Phone />,
              }}
            /></b>
            <TextField max="13"
              id="nationalId"
              label="CNIC"
              fullWidth
              required
              placeholder=' xxxxxxxxxxxxx'
              margin="normal"
              value={nationalId}
              onChange={(event) => setNationalId(event.target.value)}
              InputProps={{
                startAdornment: <CreditCard />,
              }}
            />

            &nbsp;
            <br></br>&nbsp;
            <br></br>

            <div class="row" > <button className='secondary'

            >


              Submit
            </button></div>

          </form>

        </div>

        }
        {activeTab === 2 && <div className="tab_panel">

          {loading && <i><center>Fetching data...</center></i>}
          {console.log(JSON.stringify(data1))}
          {load != false ?  
            <Table class="table" >
              {   

      
                data1 == 0 ? null :
                  <Thead >    
                    <Tr >
                      <Th style={{ 'padding-right': '30px' }}  >#</Th>
                      <Th style={{ 'padding-right': '100px' }}>Timestamp</Th>
                      <Th style={{ 'padding-right': '30px' }}>TransactionID</Th>
                      <Th style={{ 'padding-right': '80px' }} >CNIC</Th>
                      <Th style={{ 'padding-right': '30px' }}  >MSISDN</Th>
                      <Th style={{ 'padding-right': '80px' }} >Response</Th>
                      <Th  ></Th>
                      {/* <Th style={{'padding-right':'100px'}}>STATUS</Th> */}
                    </Tr>  
                  </Thead>  

              }
              <br></br>
              { }
              <Tbody>
                {
                  data1.map((item, index) => (

                    <Tr key={item.id}>
                      <td>{index + 1}</td>
                      {Object.values(item).map((val) => (

                        <Td>{val}</Td>
                      ))}
                    </Tr>
                  ))}
              </Tbody>

            </Table>
            : null}

          {array != 0 || data1 == null ? null :
            <div style={{ 'padding-left': "50px" }}>
              <h3><b>Please select the csv file for Multiple Queries.</b></h3>
              <p style={{ display: "flex", flexWrap: "wrap" }}><b>Format:</b> &nbsp; MSISDN (3xxyyyyyyy), CNIC (xxxxxxxxxxxxx) no of entries : 100</p>
              <br></br>

              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  ref={inputEl}
                  onChange={handleOnChange}
                />
                <button
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                >
                  View & Confirm Data
                </button>
              </form>
            </div>
          }
          <br></br>
          {data1 == 0 ?
            <Table class="table" >
              {array == 0 ? null :
                <Thead >
                  <Tr >
               
                    <Th   >MSISDN</Th> 
                    <Th >CNIC</Th>
                    {/* <Th style={{'padding-right':'100px'}}>STATUS</Th> */}
                  </Tr>
                </Thead>

              } 
              <br></br>
              <Tbody>
                {

                  array.map((item) => (

                    <Tr  key={item.id} >  

                      {Object.values(item).map((val) => (
                        <Td style={{'padding-left':'120px'}} >{val}</Td>
                      ))}
                    </Tr>  
                  ))}
              </Tbody>

            </Table>
            : null}



          {data1 == 0 ?
            <div class="row" style={{
              'overflow': 'auto',
              'display': 'block', 'padding-left': '14rem'
            }}>

              <button className='secondary'
                onClick={(e) => {
                  handleOnSubmit3(e);
                }}
              >
                Submit
              </button>
              &nbsp;
              <button className='secondary'
                onClick={(e) => {
                  handleOnSubmit2(e);
                }}
              >
                Cancel
              </button>
            </div>

            : <div class="row" style={{
              'overflow': 'auto',
              'display': 'block', 'padding-left': '12rem'
            }}><button className='secondary'  

            >  <CSVLink style={{ 'text-decoration': 'none' , 'color': 'white'}} data={data1} headers={headers}>
                  Export
                </CSVLink>   </button> &nbsp;
              <button className='secondary'
                onClick={(e) => {  
                  handleOnSubmit2(e);
                }}
              >
                Next
              </button></div>}

        </div>}


      </div>

      <center>
        <ul className="tabs">
          {activeTab == 2 ? <li className={activeTab === 1 ? '' : 'active'} onClick={() => handleTabClick(1)}><b>Click here for Single CMPA Query</b></li> : null}
          {activeTab == 1 ? <li className={activeTab === 2 ? '' : 'active'} onClick={() => handleTabClick(2)}><b>Click here for Bulk CMPA Query</b></li> : null}
        </ul></center>

      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      {apiResponse && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>CMPA Response</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Response: {apiResponse}</Typography>
            <Typography variant="body1">TransactionID: {Date.now()}</Typography>
            <Typography variant="body1">CNIC: {nationalId}</Typography>
            <Typography variant="body1">MSISDN: {phoneNumber}</Typography>
          </DialogContent>


          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default Verify;   
