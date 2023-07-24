import React, {useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import CartNavbar from './CartNavbar';

const CartList = ({cart}) => {
    const [items, setItems] = useState(cart.quantity)
  return (
    <div className="cart-items">
                  <div>
                    <div>
                      <img
                        src={require("../assets/images/jeans1.jpg")}
                        width={300}
                        height={400}
                        alt=""
                      />
                    </div>
                    <div>
                      <h1>{cart.vendor_name}</h1>
                      {/* <h1>{cart.price}</h1> */}
                    </div>
                    <div className="add-quantity">
                      <button  onClick={e=>setItems(items-1)}>-</button>
                      <h2>{items}</h2>
                      <button  onClick={e=>setItems(items+1)}>+</button> 
                    </div>
                  </div>
                </div>
  )
}

export default CartList
