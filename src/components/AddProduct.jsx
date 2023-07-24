import React, { useState } from "react";
import { Input,message, Button, Modal, Form, Cascader, Upload } from "antd";
import options from "../utils/AddItemOptions";
import { useSelector } from "react-redux";
import axios from 'axios'
import { PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const AddProduct = ({ setIsModalOpen, isModalOpen }) => {


  const [image,setImage]=useState([]);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
const [stock, setStock] = useState(0);

  const [discount, setDiscount] = useState();
  const [brand, setBrand] = useState("")
  const [type, setType] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const user = useSelector(state=>state.user.users)

  const handleChange = ({ file:newFile,fileList: newFileList }) => {
    setFileList(newFileList) ;
  (newFile.status==='done')&& setImage([...image,`http://localhost:5000/${newFile.response}`])
};
const error = (content) => {
  messageApi.open({
    type: 'error',
    content: content,
  });
};
  const handleOk = async () => {
    if (price <=0 || discount <=0){
      error('Please enter valid details')
      return;
    }
    if(fileList.length<4){
      error('Please Upload atleast 4 images');
      // setIsModalOpen(false);
      return;
    }
    if(type=="product"){

      console.log(image)
      const res = await axios.post('http://localhost:5000/addProduct',{
        vendor_name:user.name,
        vendor_email:user.email,
        price:+price,
        desc:desc,
        product_name:name,
        category:category,
        image: image,
        brand:brand,
        discount:discount,
        stock:stock
      })
      console.log(res.data);
    }
    else{
      console.log(image)
      const res = await axios.post('http://localhost:5000/addDraft',{
        vendor_name:user.name,
        vendor_email:user.email,
        price:+price,
        desc:desc,
        product_name:name,
        category:category,
        image: image,
        brand:brand,
        discount:discount,
        stock:stock,
      })
      console.log(res.data);
    }
    


    console.log(name);
    console.log(desc);
    console.log(category);
    setIsModalOpen(false);


    // setIsModalOpen(false)
  };
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Modal
        title="Basic Modal"
        width={1000}
        open={isModalOpen}
        footer={null}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
          onFinish={handleOk}
        >


          <Form.Item
            label="Prduct Brand"
            name="brand"
            rules={[{ required: true, message: "Please fill this" }]}
          >
            <Input placeholder="brand" onChange={(e) => setBrand(e.target.value)} />
          </Form.Item>


          <Form.Item
            label="Prduct Name"
            name="name"
            rules={[{ required: true, message: "Please fill this" }]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>


          <Form.Item 
            rules={[{ required: true, message: "Please fill this" }]}
            name="Upload"
          >


          <Upload
        action="http://localhost:5000/uploads"
        listType="picture-circle"
        fileList={fileList}
        onChange={handleChange}
        name='image'
        showUploadList={{showPreviewIcon:false,showDownloadIcon:false,showRemoveIcon:false}}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>



          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true,message: "Please fill this"}]}
          >
            <Cascader
              onChange={(value) => setCategory(value)}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please fill this" }]}
          >
            <TextArea rows={4} onChange={(e) => setDesc(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            maxLength={5}
            rules={[{ required: true, message: "Please fill this" },{max:5, message:"Max Price Limit"}]}
          >
            <Input type="number" maxLength={5}  onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Price After Discount"
            name="discount"
          
            rules={[{ required: true, message: "Please fill this" }, {max:5, message:"Max Price Limit"}]}
          >
            <Input type="number" maxLength={5} onChange={(e) => setDiscount(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
          
            rules={[{ required: true, message: "Please fill this" }, {max:5, message:"Max Price Limit"}]}
          >
            <Input type="number" maxLength={5} onChange={(e) => setStock(e.target.value)} />
          </Form.Item>

          <div className="addproductbtn">
            <Form.Item>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>


            <Form.Item>
              <Button
                className="submit-add-product"
                type="primary"
                onClick={()=>{setType('product')}}
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                className="submit-add-product"
                type="primary"
                onClick={()=>{setType('draft')}}
                htmlType="submit"
              >
                Draft
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
