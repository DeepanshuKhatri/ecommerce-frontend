import { Button, Col, FloatButton, Modal, Row, Select, Steps } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CaretDownOutlined } from "@ant-design/icons";

const ShowCartItem = ({price, discount,setTotalDiscount,setTotalPrice, setPrice, setDiscount, page, cart, cartItems, setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const user = useSelector((state) => state.user.users);
  const [quantity, setQuantity] = useState(1);


  function run(){

  }
  useEffect(()=>{
    if(page=="cart"){
      setPrice(prev=>prev+(cart.price*quantity))
      setDiscount(prev=> prev+(cart.discount * quantity));
        run();
      }
      if(page=="myorder"){
        console.log(cart)
        setTotalPrice(prev=> prev+(cart.price)*(cart.quantity))
        setTotalDiscount(prev=>prev+(cart.discount)*(cart.quantity))
      }
      // setPrice( (price +cart.price));
    },[quantity])


    async function cancelOrder(){
      const res = await axios.post('http://localhost:5000/cancelOrder',{id:cart._id})
      console.log(res.data);
    }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function handleQuantity() {
    setIsModalOpen(false);
    setQuantity(productQuantity);
  }

  async function handleChange(id, value){
    const data = axios.post('http://localhost:5000/changeOrderStatus',{id:id, value:value})
    console.log(data.data);
  }

  // console.log(cart)
  async function removeItem(id) {
    setPrice(prev=> prev-cart.price);
    setDiscount(prev=> prev-(cart.discount * quantity));
    const res = await axios.post("http://localhost:5000/removeFromCart", {
      product_id: id,
    });
    console.log(res.data);
    setCartItems(cartItems.filter((x) => x._id != id));
  }
  async function updateQuantity() {}
  return (
    <div className="show-cart-item">
    <div className="showing-cart-items">
      <div className="cart-product-img">
        <img src={cart?.image} height={130} width={100} alt="" />
      </div>
      <div className="cart-item-overview">
        <h5>{cart?.brand}</h5>
        <h4>{cart?.product_name}</h4>
        <h4>${cart?.discount}</h4>

        {page == "cart" ? (
          <>
            <button onClick={showModal} className="quantity-btn">
              Qty : {quantity} <CaretDownOutlined />
            </button>
            <button
              onClick={() => removeItem(cart._id)}
              className="remove-from-cart-btn"
            >
              X
            </button>
            <Modal
              width={600}
              footer={null}
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="select-quantity">
                <div
                  onClick={() => setProductQuantity(1)}
                  className={
                    productQuantity == 1
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  1
                </div>
                <div
                  onClick={() => setProductQuantity(2)}
                  className={
                    productQuantity == 2
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  2
                </div>
                <div
                  onClick={() => setProductQuantity(3)}
                  className={
                    productQuantity == 3
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  3
                </div>
                <div
                  onClick={() => setProductQuantity(4)}
                  className={
                    productQuantity == 4
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  4
                </div>
                <div
                  onClick={() => setProductQuantity(5)}
                  className={
                    productQuantity == 5
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  5
                </div>
                <div
                  onClick={() => setProductQuantity(6)}
                  className={
                    productQuantity == 6
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  6
                </div>
                <div
                  onClick={() => setProductQuantity(7)}
                  className={
                    productQuantity == 7
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  7
                </div>
                <div
                  onClick={() => setProductQuantity(8)}
                  className={
                    productQuantity == 8
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  8
                </div>
                <div
                  onClick={() => setProductQuantity(9)}
                  className={
                    productQuantity == 9
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  9
                </div>
                <div
                  onClick={() => setProductQuantity(10)}
                  className={
                    productQuantity == 10
                      ? " selected-quantity cart-quantity"
                      : "cart-quantity"
                  }
                >
                  10
                </div>
              </div>
              <button onClick={handleQuantity} className="set-quantity-btn">
                Done
              </button>
            </Modal>
          </>
        ) : (
          <>
            <button disabled style={{ border: "none" }}>
              Qty : {quantity} <CaretDownOutlined />
            </button>
          </>
        )}{
          (page=='order') &&
          <>
          
          {
            (cart?.cancelled==false) ?
            <h2 style={{color:"red"}} className="cancel-order-btn">Cancelled</h2>
            :
            <Button type="primary" onClick={cancelOrder} className="cancel-order-btn" danger>Cancel Order</Button>
          }
          </>
        }

      </div>
      <div className="vendor-order-status">
        {
          user.role=="vendor" && page=="myorder" &&
        <Select
          defaultValue={cart?.status||0}
          onChange={(value)=>handleChange(cart._id, value)}
          style={{
            width: 200,
          }}
          // onChange={handleChange}
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
        />
      }

        </div>
    </div>
    {
      user.role!="admin" &&  page=="order" &&
      <>
      
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
      </>

    }

    </div>
  );
};

export default ShowCartItem;
