import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useSelector } from 'react-redux';
import ShowCartItem from '../components/ShowCartItem';
import { Divider } from 'antd';
import ShowOrders from '../components/ShowOrders';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector(state=>state.user.users);

  useEffect(()=>{
    async function run(){
      const data = await axios.post('http://localhost:5000/getMyOrders',{email:user.email});
      setOrders(data.data)
    }
    run();
  },[])
  console.log(orders)



  return (
    <div>
      <Navbar/>
      <div className="order-container">
      {/* <div className="cart-details"> */}
          
          <Divider/>
          {orders && 
          orders.map((order)=>{
           return  <ShowOrders page="order" cart={order} cartItems={orders} setCartItems={setOrders}/>
          })
          }
        {/* </div> */}


      </div>

    </div>
  )
}

export default Order;