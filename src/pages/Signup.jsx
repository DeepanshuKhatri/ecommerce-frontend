import React, { useState } from 'react'
import { Form, Input,Float, Button,message, Divider, Radio, Modal } from 'antd'
import {GoogleOutlined} from '@ant-design/icons'
import '../assets/styles/styles.css'
import { addUser } from '../redux/slice/user.slice'
import { useDispatch } from 'react-redux'
import { auth, db } from "../config/firebase";
import axios from 'axios';
import {
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
// import e from 'express'

const Signup = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [role, setRole] = useState("customer")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


      const handleOk = () => {
        setIsModalOpen(false);
      };

    function handleNumber(e){
        // const x = e.target.value;
        // setNumber(e.target.value);
        // console.log(isNaN(x))
        // if(!isNaN(x)){
        //   setNumber(x);
        //   // console.log(number)
        //   // return;
        // }
        // else{
    
        //   setNumber(x);
        //   console.log(number)
    
        // }
      }
    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'User Already Exists',
        });
      };

      const error2 = (content) => {
        messageApi.open({
          type: 'error',
          content: content,
        });
      };

      const success = (content) => {
        messageApi.open({
          type: 'success',
          content: content,
        });
      };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async (res) => {
          const res1 = res.user;
          console.log(res);
          setEmail(res1.email)
          setName(res1.name)
          const response = await axios.post('http://localhost:5000/signup', {name:res1.displayName, email:res1.email})
          const data = response.data
          console.log(response.data)
          if(response.status==201){
            dispatch(addUser)
              //   navigate('/')
              success('Successfully Logged In');

              dispatch(addUser({
                name:data.name, email:data.email, role:data.role, number:data?.number, password:data?.password
            }))
              setTimeout(() => {
                  navigate('/');
                }, 2000);
            }
            else{
                setIsModalOpen(true)
                success('Successfully Logged In');
                navigate('/')
          }
        

        }
        );
      };
      const formFinish = async (values) => {
        
        console.log('Success:', values);
        const response = await axios.post('http://localhost:5000/addSignupDetail', {role:role, email:email})
        console.log(response.data)
        dispatch(addUser({
                name, email, password, role, number
            }))
            setIsModalOpen(false);
            navigate('/')
      };

    async function onFinish(value) {
        console.log(value,"i m inside finish")
        // 
        if(isNaN(value.number)|| value.number.trim()===""){
          error2("Please enter valid details")
          return;
        }
        const res = await axios.post('http://localhost:5000/signup', {name, email, number:value.number, password, role})
        if(res.status==201){
          
            error();
        }
        else {
            // alert("Account Created Successfully")
            success("Account Created Successfully");
            // navigate('/login')
        }
        console.log(email)
        console.log(password) 
        console.log(name)
        console.log(role)
        setTimeout(() => {
          navigate('/login');
        }, 2000);
    }
    return (
        <div className='login-signup-page'>
            {contextHolder}

            <div className='login-signup-container'>
                <Form
                    onFinish={onFinish}
                    
                    >
                        <Form.Item>

                    <h1 className='login-text'>It'll only take 2 minutes!</h1>
                        </Form.Item>

                        <Form.Item name="name"
                    initialValue={name}
                        rules={[
                            {
                                required: true,
                                message: 'Please ennter your name',
                            },
                        ]}
                    >
                        <Input placeholder='Enter your name' onChange={e=>setName(()=>e.target.value.trim())} className='login-signup-input' />
                    </Form.Item>


                    <Form.Item name="emailOrPhone"
                    initialValue={email}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type='email' placeholder='Enter Email ' onChange={e=>setEmail(e.target.value.trim())} className='login-signup-input' />
                    </Form.Item>


                    <Form.Item name="number"
                    initialValue={number}
                        
                    >
                        <Input type='text'  placeholder='Enter Phone Number' onChange={e=>handleNumber(e)} maxLength={10} className='login-signup-input' />
                    </Form.Item>

                    <Form.Item name="password"
                    initialValue={password}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password  onChange={e=>setPassword(e.target.value.trim())} placeholder='Enter Password' className='login-signup-input' />
                    </Form.Item>

                    <Form.Item   
                    label="Select Role"
                    >
                    <Radio.Group value={role} className='select-role' onChange={e=>setRole(e.target.value)}>
            <Radio value="customer">Customer</Radio>
            <Radio value="vendor">Vendor</Radio>
          </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </Form.Item>
                    <Form.Item>

                        <Button type='primary'className='login-btn' htmlType='submit'>
                            Signup
                        </Button>
                    </Form.Item>

                </Form>
                <Divider>or</Divider>

                <Button icon={<GoogleOutlined className='google-icon'/>} onClick={signInWithGoogle} className='google-login' type='primary'>Sign in with Google</Button>

            </div>

            <Modal title="Basic Modal" footer={null} open={isModalOpen} onOk={handleOk}>
            <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={formFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >


    <Form.Item   
                    label="Select Role"
                    >
                    <Radio.Group value={role} className='select-role' onChange={e=>setRole(e.target.value)}>
            <Radio value="customer">Customer</Radio>
            <Radio value="vendor">Vendor</Radio>
          </Radio.Group>
                    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>


        </div>
    )
}

export default Signup