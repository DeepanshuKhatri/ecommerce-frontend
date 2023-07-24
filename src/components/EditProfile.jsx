import React, { useState } from 'react';
import { Button, Modal, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  Checkbox, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addUser } from '../redux/slice/user.slice';

const  EditProfile= ({isModalOpen, setIsModalOpen}) => {
    const userData = useSelector(state=>state.user.users)
    const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [address, setAddress] = useState(userData?.address);
  const [password, setPassword] = useState(userData?.password);
  const [image,setImage]=useState(userData?.image||"");
  const [number, setNumber] = useState(userData?.number);
  const [role, setRole] = useState(userData?.role)
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const handleChange = ({ file:newFile,fileList: newFileList }) => {
    setFileList(newFileList) ;
  (newFile.status==='done')&& setImage(`http://localhost:5000/${newFile.response}`)
};

  function handleNumber(e){
    const x = e.target.value;
    console.log(isNaN(x))
    if(!isNaN(x)==true){
      setNumber(x.trim());
      console.log(number)
      // return;
    }
    else{

     

    }
  }






const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);


    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(
          addUser({
            role:userData.role,
            image,
            name,
            email,
            address,
            password,
          })
        );
      setIsModalOpen(false);

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
      <>
        {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
        <Modal title="Basic Modal" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

<Form.Item label="Update Profile">

<Upload
  action="http://localhost:5000/uploads"
  multiple='true'
  listType="picture-circle"
  fileList={fileList}
  onChange={handleChange}
  name='image'
  showUploadList={{showPreviewIcon:false,showDownloadIcon:false,showRemoveIcon:true}}
>
          {fileList.length >= 1 ? null : uploadButton}
</Upload>
</Form.Item>
    <Form.Item
      label="Username"
      name="username"
      initialValue={name}
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input  value={name} onChange={(e)=>setName(e.target.value)} />
    </Form.Item>
    
      
      <Form.Item
        label="email"
        name="email"
        initialValue={email}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input disabled/>
      </Form.Item>

      <Form.Item
        label="number"
        name="number"
        initialValue={number}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            max:10,
            message: 'Max limit is 10',
          },
        ]}
      >
        <Input value={number} name="number"  onChange={handleNumber}/>
      </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      initialValue={password}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password value={password} onChange={(e)=>setPassword(e.target.value)} />
    </Form.Item>


    <Form.Item>
      <Button onClick={()=>setIsModalOpen(false)}  >
        Cancel
      </Button>
    </Form.Item>  
    

    <Form.Item
      
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </Modal>
      </>
    );
}

export default EditProfile;