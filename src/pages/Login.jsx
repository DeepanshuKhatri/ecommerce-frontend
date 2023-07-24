import React, { useState } from 'react'
import { Form, Input, Button, Divider, message,Modal, Radio } from 'antd'
import {GoogleOutlined} from '@ant-design/icons'
import '../assets/styles/styles.css'
import axios from 'axios'
import {addUser} from '../redux/slice/user.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, db } from "../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
// import e from 'express'

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [number, setNumber] = useState("")

    const [name, setName] = useState("")
    const [role, setRole] = useState("customer")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const success = (content) => {
        messageApi.open({
          type: 'success',
          content:content,
          duration: 10,
        });
      };

      const error = (content) => {
        messageApi.open({
          type: 'error',
          content: content,
          duration:5,
        });
      };

      const signInWithGoogle = async () => {
        try{

        
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
                dispatch(addUser({
                  name:data.name, email:data.email, role:data.role, number:data?.number, password:data?.password
              }))
                navigate('/')
          }
        

        }
        ).catch((err)=>{
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
      };

      const handleOk = () => {
        setIsModalOpen(false);
      };

      const formFinish = async (values) => {
        console.log('Success:', values);
        const response = await axios.post('http://localhost:5000/addSignupDetail', {role:role, email:email})
        console.log(response.data)
        dispatch(addUser({
                name, email, password, role, number
            }))
            setIsModalOpen(false);
            success("logged In Successfully");

            setTimeout(() => {
            }, 2000);
            navigate('/');
            
            // navigate('/')
      };



    async function onFinish() {
        const res = await axios.post('http://localhost:5000/login', {email, password})
        if(res.status==201){
            // alert()
            // success();
            error("Invalid Credentials");
        }
        else if(res.status==202){
            error("You don't have access!")
        }
        else{
            console.log(res.data)
            dispatch(addUser({
                name:res.data.name,
                email:res.data.email,
                role:res.data.role,
                password:res?.data?.password,
                number:res?.data?.number,
            }))
            // alert("Logged In Successfully")
            success("logged In Successfully");
            setTimeout(() => {
              navigate('/');
            }, 2000);
        }
        console.log("Finish")
        console.log(email)
        console.log(password)
    }
    return (
        <div className='login-signup-page'>
            {contextHolder}

            <div className='login-signup-container'>
                <Form
                    onFinish={onFinish}
                    
                    >
                        <Form.Item>

                    <h1 className='login-text'>Welcome back!</h1>
                        </Form.Item>
                    <Form.Item name="emailOrPhone"
                    initialValue={email}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter email or phone number',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Email or Phone Number' onChange={e=>setEmail(e.target.value.trim())} className='login-signup-input' />
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
                    <Form.Item>
                        <p>Dont't have an Account? <a href="/signup">Signup</a></p>
                    </Form.Item>
                    <Form.Item>

                        <Button type='primary'className='login-btn' htmlType='submit'>
                            Sign in
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

export default Login