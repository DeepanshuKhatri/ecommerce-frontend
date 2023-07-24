import React, { useEffect, useState } from 'react'
import {Input, Button, Menu} from 'antd'
import { HeartOutlined, SearchOutlined, UserOutlined, MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/slice/user.slice'


const AdminNavbar = () => {
  const dispatch = useDispatch(); 
  function logout(e){
    dispatch(removeUser())
  }
    const navigate = useNavigate()
  return (
    <div>
        <div className="navbar">
        <div className='navbar-left'>
          <div className="navbar-logo">
            <img src={require('../assets/images/myntra-logo-2.png')} onClick={()=>navigate('/')} className='myntra-logo' alt="asdfds" />
          </div>

          {/* <Menu
          // onClick={onClick}
          width={1000}
          height={600}
          className="admin-menu"
          mode="horizontal"
          items={items}
        />*/}
        </div>
        <div className="navbar-right">

        </div> 


          {/* <div className="categories">
          <Menu
          onClick={onClick}
          width={1000}
          height={600}
          className="menu-categories"
          mode="horizontal"
          items={items}
        />
          </div>

        </div>
        <div className="navbar-right">
        <Input prefix={<SearchOutlined className='search-outlined'/>} onChange={check} placeholder='Search for products, brands and more' className="search-navbar" />
        <div className="pages">
        <div className="page" onClick={()=>navigate('/profile')}>
        <UserOutlined/>
        Profile
        </div>
        <div className="page" onClick={()=>navigate('/cart')}>
        <HeartOutlined/>
        Cart
        </div>
        <div className="page" onClick={()=>navigate('/orders')}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        Orders
        </div> */}
        {/* {user.role=="vendor" && 
        <div className="page"  onClick={()=>navigate('/myProducts')}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        My Products
        </div>
  } */}
        <div className="page" onClick={logout}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        Logout
        </div>
        
        {/* </div> */}
        {/* </div> */}
        </div>

      {/* </div> */}
    </div>
  )
}

export default AdminNavbar