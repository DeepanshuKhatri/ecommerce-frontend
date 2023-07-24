import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartNavbar = () => {
    const navigate = useNavigate();
  return (
    <div className='cart-navbar'>
        <div className="cart-navbar-left">

        <div className="navbar-logo">
        <img src={require('../assets/images/myntra-logo-2.png')} onClick={()=>navigate('/')} className='myntra-logo' alt="asdfds" />
        </div>
        </div>
        <div className="cart-navbar-center">
            <div>
                BAG
            </div>
            <div>
                ADDRESS
            </div>
            <div>
                PAYMENT
            </div>
        </div>
        <div className="cart-navbar-right">
        <img src={require('../assets/images/secure-logo.jpg')}  alt="" />

        </div>
    </div>
  )
}

export default CartNavbar