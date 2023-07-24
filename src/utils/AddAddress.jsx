import React, { useState } from 'react'
import { Divider, Modal, Form, Input, Checkbox, Button } from "antd";
import axios from 'axios'
import {useSelector} from 'react-redux'


const AddAddress = ({addAddressModalOpen, setAddAddressModalOpen}) => {
  const user = useSelector(state=>state.user.users)
    const [addressDetails, setAddressDetails] = useState({
        name:"",
        number:"",
        address:"",
        locality:"",
        city:"",
        state:""
    })
    
    async function submitDetails(){
    console.log(addressDetails)
    const res = await axios.post('http://localhost:5000/addAddress', {email:user.email, addressDetails})
      console.log(res.data)
        console.log("submit details")
    }


    function handleChange(event){
        const {value, name} = event.target;
        // console.log("value", value)
        // console.log("name", name);

        setAddressDetails((prev)=>{
            return {...prev,
            [name] : value
        }
    })
}


    async function onFinish(){
        setAddAddressModalOpen(false)
        console.log("OnFinish")
    }
//   const handleAddAddressOk = () => {
//     setAddAddressModalOpen(false);
//   };
//   const handleAddAddressCancel = () => {
//     setAddAddressModalOpen(false);
//   };
  return (
    <div>
        <Modal title="Basic Modal" footer={null} open={addAddressModalOpen} >
          <h1>Add Address</h1>
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
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your Name!',
        },
      ]}
    >
      <Input name="name" onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      label="Phone Number"
      name="number"
      rules={[
        {
          required: true,
          message: 'Please input your Mobile Number!',
        },
      ]}
    >
      <Input name="number" onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      label="City"
      name="city"
      rules={[
        {
          required: true,
          message: 'Please input your City!',
        },
      ]}
    >
      <Input name="city" onChange={handleChange}/>
    </Form.Item>




    <Form.Item
      label="State"
      name="state"
      rules={[
        {
          required: true,
          message: 'Please input your state!',
        },
      ]}
    >
      <Input name="state" onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      label="Address"
      name="address"
      rules={[
        {
          required: true,
          message: 'Please input your address!',
        },
      ]}
    >
      <Input name="address" onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      label="Locality"
      name="locality"
      rules={[
        {
          required: true,
          message: 'Please input your Locality!',
        },
      ]}
    >
      <Input name="locality" onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button  onClick={()=>setAddAddressModalOpen(false)}>
        Cancel
      </Button>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" onClick={submitDetails} htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
    </div>
  )
}

export default AddAddress