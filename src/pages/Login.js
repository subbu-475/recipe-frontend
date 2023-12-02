import React from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import axios from 'axios';
import API_URL from '../config/global';

function Login() {
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`,formData);
            if(response.data.status===true){
                navigate('/');
            }
            else if (response.data==="invalid username or password"){
                alert('Username or password is wrong');
                setFormData({
                    email:"",
                    password:""
                });
            }
            else if (response.data==="server busy"){
                alert("server busy");
                setFormData({
                    email:"",
                    password:""
                });
            }

        }
        catch (err){
            console.log(err);
        }
    }

  return (
    <>
        <Container>
            <h1 className='login-heading'>Login Form</h1>
            <Form onSubmit={handleSubmit}>
                {/*<Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter a username'/>
                </Form.Group>*/}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleChange} type='email' name='email' value={formData.email} placeholder='Enter a email'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={handleChange} name='password' value={formData.password} placeholder='Enter a password'/>
                </Form.Group>
                <Form.Text >New user please</Form.Text><Link to={'/signup'} className='signup-text'>Signup</Link>
                <Button variant='primary' type='submit' className='login-btn'>Login</Button>
            </Form>
        </Container>
    </>
  )
}

export default Login;