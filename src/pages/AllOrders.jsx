import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Select } from 'antd'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  useEffect(()=>{
    async function run(){
      const data = await axios.get('http://localhost:5000/getAllOrders')
      console.log(data.data)
      setOrders(data.data);
    }
    run();
  }, [])
  async function handleChange(id, value){
    const data = axios.post('http://localhost:5000/changeOrderStatus',{id:id, value:value})
    console.log(data.data);
  }
  return (
    <div>
      <Navbar/>
      <div className="order-container">

      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Vendor Email</th>
              <th scope="col">Status</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders && 
            orders.map((order)=>{
              return <tr>
                <td>{order.vendor_name}</td>
                <td>{order.product_id}</td>

                <td>{order.vendor_email}</td>

                <td><Select
          defaultValue={order?.status||0}
          style={{
            width: 200,
          }}
          onChange={(value)=>handleChange(order._id, value)}
          options={[
            {
              value: 0,
              label: "Order placed",
            },
            
            {
              value: 1,
              label: "Shipped",
            },
            {
              value: 2,
              label: "Out for Delivery",
            },
            {
              value: 3,
              label: "Delivered",
            },
          ]}
        /></td>

                <td>{order.address}</td>


              </tr>
            })
            
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllOrders