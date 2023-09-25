import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [formData, setFormData] = useState({
    userName: '',
    passwd: '',
    cnic: '',
    msisdn: '',
    transactionID: ''
  });
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/cnic/verify', formData);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passwd">Password</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cnic">CNIC</label>
          <input
            type="text"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
          />
        </div>
        <div>  
          <label htmlFor="msisdn">MSISDN</label>
          <input
            type="text"
            id="msisdn"
            name="msisdn"
            value={formData.msisdn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="transactionID">Transaction ID</label>
          <input
            type="text"
            id="transactionID"
            name="transactionID"
            value={formData.transactionID}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MyForm;
