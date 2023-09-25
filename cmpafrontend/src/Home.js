import React, { useState } from "react";


import "./Style.css";



import logo from '../src/Logo.png';
import logoOperator from '../src/logo-operators-v4.png';
const Home = props => (

  <LoginForm />
);

class LoginForm extends React.Component {

  render() {

    return (
      <div id="loginform">
<br></br>
        <center><img src={logo} width="100" /></center>
        <center><h3>Pakistan MNP Database (G) Limited</h3></center>
        <center> <p>a jointly own company of </p></center>
        <center><img src={logoOperator} width="350" /></center>
        <Form />
        <br></br> <center> <label>v1.0 Developed by <a href="https://pmdpk.com">PMD</a> &copy; 2023</label></center><br></br><br></br>
      </div>
    )
  }
}




const handleSubmit = async (event) => {

  //Prevent page reload
  event.preventDefault();

  var { uname, pass } = document.forms[0];


  const payload = {
    username: uname.value,
    password: pass.value,

  };

              
    // Make the API call
    const response = await fetch('http://localhost:5003/api/v1/rest/cmpaapiforcmpagui', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   
      }, 
      body: JSON.stringify(payload),   
    });

    // Parse the API response   
    const data = await response.json();

    // Compare user info
    if (data) {
      if (data.message === "yes") {
        // Invalid password

        localStorage.setItem('cmpaPayload', JSON.stringify(payload));

        window.location.replace('/Verify')

      } else {

        alert("Username and password is incorrect")

      }
    } else {
      // Username not found
      console.log({ name: "uname", message: 'error' });
    }
  };


  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );


  const Form = props => (

    <div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <br></br>
          <input description="Username" name="uname" placeholder="username" type="text" /></div>
        <div class="row"><input description="Password" name="pass" placeholder="password" type="password" /></div>
        <br></br>
        <div id="button" class="row"><button style={{ 'border-radius': '15px' }} type="submit" title="Log in">Log in</button> </div>
      </form>
 
    </div>
  );

  const FormButton = props => (
    <div id="button" class="row">
      <button>{props.title}</button>
    </div>  
  );

  const Input = props => (
    <div class="row">
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder} />
    </div>
  ); 

  const OtherMethods = props => (
    <div id="alternativeLogin">
      <label>Version 1.0  04 -July -2023</label><br></br>
      <label>Developed by <a target="_blank" href="https://pmdpk.com">PMD</a></label>
     <br></br><br></br>
    </div>
  );



  export default Home;    