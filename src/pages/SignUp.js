import React, { useState } from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import '../styles/signup.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/global';

function SignUp() {

    const [formData,setFormData]=useState({
        name:"",
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
            const response = await axios.post(`${API_URL}/signin/verify`,formData)
            if(response.data==="Mail sent successfully"){
                alert('An email sent to your gmail id! please chek and verify!')
                setFormData({
                name:"",
                email:"",
                password:""
            })
            }
            else{
                alert('User already exists! plese login')
            }
        }
        catch(err){
            alert('Error is: ', err)
            console.log(err);
        }
    }

  return (
    <>
        <Container>
            <h1>Registeration Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' onChange={handleChange} name='name' value={formData.name} placeholder='Enter a name'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' onChange={handleChange} name='email' value={formData.email} placeholder='Enter a email'/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' onChange={handleChange} value={formData.password} placeholder='Enter a password'/>
                    <Form.Text className='to-login-text'>Already signedup please click here to login</Form.Text><Link to={'/login'} className='login-text'>Login</Link>
                </Form.Group>
                <Button variant='primary' type='submit' className='signup-btn'>Register</Button>
            </Form>
        </Container>
    </>
  )
}

export default SignUp;