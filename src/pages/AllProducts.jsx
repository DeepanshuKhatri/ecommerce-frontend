import React, { useEffect, useState } from "react";
import {Carousel, Divider, FloatButton} from "antd";
import {useSelector} from  'react-redux';
import Navbar from "../components/Navbar";
import axios from "axios";
import ListingProducts from "../components/ListingProducts";
import AdminNavbar from "../components/AdminNavbar";
import AddProduct from "../components/AddProduct";
import { PlusOutlined } from "@ant-design/icons";


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const user = useSelector(state=>state.user.users)
    
  
      const showModal = () => {
        setIsModalOpen(true);
      };
  
      useEffect(()=>{
          async function run(){
              const res = await axios.get('http://localhost:5000/getProduct')
              setProducts(res.data)
            setFilteredProducts(res.data)
  
          }
          run();
      },[] )
  
    return (
      <div>
                <Navbar products={products} setFilteredProducts={setFilteredProducts}/>
          <ListingProducts page="myProducts" products={filteredProducts}/>
          {user.role!="customer" && <FloatButton onClick={showModal} icon={<PlusOutlined />} />}
        {isModalOpen && <AddProduct setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>}
      </div>
    )
}

export default AllProducts