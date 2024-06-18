import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../assets/styles/singup.module.scss';

function HandleSingUp() {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
    email: ''
  });

  let flag = false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const field in formData) {
      if (!formData[field]) {
        alert(`please enter ${field}`);
        return;
      }else{
        flag = true;
      }
    }

    if(flag){
      try {
        const response = await axios.post('http://127.0.0.1:8000/singup', formData);
        console.log("is: "+JSON.stringify(response.data))
        alert("Add Successfully");
      } catch (error) {
        alert("This Acount Is Exit");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-transparent text-white">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register Minh</h2>
              <form action=''>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control" name="user" placeholder='User' value={formData.user} onChange={handleChange} />
                  {errors.user && <p className="text-danger">{errors.user[0]}</p>}
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="text-danger">{errors.email[0]}</p>}
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={handleSubmit}>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandleSingUp;
