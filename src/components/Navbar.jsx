import React, { useEffect, useState } from 'react'
import {Input, Button, Menu} from 'antd'
import { HeartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/slice/user.slice'
import items from "../utils/Categories";


const Navbar = ({page, products, setShowCarousel, setFilteredProducts}) => {
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const user = useSelector(state=>state.user.users)
  const dispatch = useDispatch();

  function check(e){
    setFilteredProducts(products?.filter(x=>x.category[1].includes(e.target.value)))
    if(e.target.value == ""){
      setShowCarousel(true)
    }else{

      setShowCarousel(false)
    }
  }
  function logout(e){
    dispatch(removeUser())
  }
  function onClick(){
    console.log("first")
  }
  function onClick(e) {
    console.log(e.key)
    setFilteredProducts(products?.filter(x=>x.category[1].includes(e.key)))
    setShowCarousel(false)

  }

    const navigate = useNavigate();
    
  return (
    <div>





      <div className="navbar">
        <div className={user.role=="admin" ? "admin-navbar-left":'navbar-left'}>
          <div className="navbar-logo">
            <img src={require('../assets/images/myntra-logo-2.png')} onClick={()=>navigate('/')} className='myntra-logo' alt="asdfds" />
          </div>

    {
      (user.role!="admin" && page =="home") && 
          <div className="categories">
          <Menu
          onClick={onClick}
          width={1000}
          height={600}
          className="menu-categories"
          mode="horizontal"
          items={items}
          />
          </div>
        }

        </div>
        <div className={user.role=="admin"? "admin-navbar-right": "navbar-right"}>
          {
            (user.role!="admin" && page =="home") &&
        <Input prefix={<SearchOutlined className='search-outlined'/>} onChange={check} placeholder='Search for Brand' className="search-navbar" />
          }
        <div className={user.role=="admin"? "admin-pages": "pages"}>
        <div className="page" onClick={()=>navigate('/profile')}>
        <UserOutlined/>
        Profile
        </div>
        {user.role!="admin" && 
        <div className="page" onClick={()=>navigate('/cart')}>
        <HeartOutlined/>
        Cart
        </div>
        }




          {user.role=="admin" ?
        <div className="page" onClick={()=>navigate('/allOrders')}>
          
          <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
          All Orders
          </div>:







<div className="page" onClick={()=>navigate('/orders')}>

          <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        Orders
        </div>
        }
       
        {user.role=="vendor" && 
        <div className="page"  onClick={()=>navigate('/myProducts')}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        My Products
        </div>
  }
  {user.role=="admin"
  && 
  <div className="page"  onClick={()=>navigate('/allProducts')}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        All Products
        </div>
  }

  {user.role=="admin"
  && 
  <div className="page"  onClick={()=>navigate('/vendors')}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        Vendors
        </div>
  }
        <div className="page" onClick={logout}>
        <img className='bag-icon-navbar' src={require('../assets/images/shopping-bag.png')} alt="" />
        Logout
        </div>
        
        </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar


        {/* <div className="navbar">
        <nav className="nav">
          <Input suffix={<SearchOutlined />} onChange={check} className="search-navbar" />
          <Button
            onClick={() => navigate("/profile")}
            className="profile-btn-nav"
          >
            Profile
          </Button>
          <Button onClick={()=>navigate('./cart')}   className="profile-btn-nav">Cart</Button>
          <Button onClick={logout} className="profile-btn-nav">Log Out</Button>
          {user.role=="vendor" && <Button onClick={()=>navigate('./myProducts')} className="profile-btn-nav">Your Products</Button>}
        </nav>
      </div> */}