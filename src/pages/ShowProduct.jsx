import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Button,Input, Divider} from 'antd'
import {HeartOutlined} from '@ant-design/icons'
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from 'axios'


const ShowProduct = () => {
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(0)
  const [present, setPresent] = useState(false);
  const user = useSelector(state=>state.user.users)
  const navigate = useNavigate();

  
  const location = useLocation();
  useEffect(()=>{
    
    console.log(location.state);
    setPrice(location.state.item.price)
    
  },[])
  
  useEffect(()=>{
    async function run(){
      const res = await axios.post('http://localhost:5000/alreadyInCart',{buyer_email:user.email, product_id:location.state.item._id})
      console.log(res)
      setPresent(res.data)
    }
    run();
  },[])


  async function addToCart(){
    console.log(user.email)
    console.log(location.state.item._id)
    const res = await axios.post('http://localhost:5000/addToCart',{
      
    buyer_email:user.email,
    buyer_name:user.name,
    vendor_email:location.state.item.vendor_email,
    vendor_name:location.state.item.vendor_name,
     product_id:location.state.item._id,
    brand:location.state.item.brand,
    price:location.state.item.price,
    discount:location.state.item.discount,
    product_name:location.state.item.product_name,
    image:location.state.item.image[0]
    })
    console.log(res.data)
    setPresent(true)
  }


  return (
    <div>


      <Navbar/>

    <div className="product-detail-container">

      <div className="product-details">

        <div className="product-images">
          {
            location.state.item.image.map((img)=>{
              // console.log(img)
              return <img src={img} className="product-page-image" alt="" />
            })
          }



        </div>
      <div className="product-item-details">
        <div>
        <h1>{location.state.item.brand}</h1>
        <h2>{location.state.item.product_name}</h2>
        </div>
        <Divider/>
        <h2>${location.state.item.discount}<h4 style={{textDecoration:"line-through"}}> ${location.state.item.price}</h4></h2>
        <Divider/>
        <div>

        {/* <h1 className="total-price-product-detail">Total Price:{price}</h1> */}
        </div>
        {/* <Divider/> */}
        {( location.state.item.vendor_email!== user.email && user.role!="admin") &&
        
        <>
        
        <div className="product-page-btns">
          {
              present === true?

            <button onClick={()=>navigate('/cart')} className="product-page-add-to-cart"> Go to Cart</button>
            :

            <button disabled={location?.state?.item?.stock===0} onClick={addToCart}  className="product-page-add-to-cart"><HeartOutlined  className="add-to-cart-icon"/> Add to Cart</button>

          }
        </div>
        <Divider/>
        </>

        }
        <div>
          <h2>Product Description</h2>
          <p>{location.state.item.desc}</p>
        </div>
        <Divider/>
        
      </div>
      </div>

    </div>
    </div>

  );
};

export default ShowProduct;
