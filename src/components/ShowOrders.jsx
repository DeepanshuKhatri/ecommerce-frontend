import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Button, Steps } from 'antd';

const ShowOrders = ({cart}) => {
    const [cancel, setCancel] = useState(cart?.cancelled||false)
    async function cancelOrder(){
        const res = await axios.post('http://localhost:5000/cancelOrder',{id:cart._id})
        console.log(res.data);
        setCancel(true)
      }
  return (
    <div className='show-cart-item'>
        <div className="showing-cart-items">
      <div className="cart-product-img">
        <img src={cart?.image} height={130} width={100} alt="" />
      </div>
      <div className="cart-item-overview">
        <h5>{cart?.brand}</h5>
        <h4>{cart?.product_name}</h4>
        <h4>${cart?.discount}</h4>
        <h4 style={{"textDecoration":"line-through"}}>${cart?.price}</h4>
        {

        setCancel===false &&
        <Button type="primary" onClick={cancelOrder} className="cancel-order-btn" danger>Cancel Order</Button>
        }
        {
            setCancel===true &&
            <h2 style={{color:"red"}} className="cancel-order-btn">Cancelled</h2>
        }
        </div>
        </div>
        <Steps
    current={cart?.status}
    items={[
      {
        title: 'Order Placed',
      },
      {
        title: 'Shipped',

      },
      {
        title: 'Out for Delivery',
      },
      {
        title: 'Delivered',
      },
    ]}
  />
    </div>
  )
}

export default ShowOrders