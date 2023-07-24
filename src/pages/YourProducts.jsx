import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ListingProducts from "../components/ListingProducts";
import Navbar from "../components/Navbar";
import { Divider, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProduct from "../components/AddProduct";
import ShowCartItem from "../components/ShowCartItem";

const YourProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [orders, setOrders] = useState([]);
  const [draft, setDraft] = useState([])
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.users);

  useEffect(() => {
    async function run() {
      const data = await axios.post("http://localhost:5000/getMyProductOrders", {
        vendor_email: user.email,
      });
      console.log(data.data)
      setOrders(data.data);
    }
    run();
  }, [page]);


  useEffect(()=>{
    async function run() {
    const data = await axios.post("http://localhost:5000/myDraft", {
        vendor_email: user.email,
      });
      console.log(data.data)
      setDraft(data.data);
    }
    run();
  }, [page])

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function run() {
      const res = await axios.post("http://localhost:5000/myProduct", {
        vendor_email: user.email,
      });
      setProducts(res.data);
      setFilteredProducts(res.data);
    }
    run();
  }, [page]);

  return (
    <div>
      <Navbar products={products} setFilteredProducts={setFilteredProducts} />
      <div className="dashboard">
      <div
          onClick={() => setPage(1)}
          className={
            page == 1 ? "dashboard-options selected-page" : "dashboard-options"
          }
        >
          My Drafts
        </div>
        <div
          onClick={() => setPage(2)}
          className={
            page == 2 ? "dashboard-options selected-page" : "dashboard-options"
          }
        >
          My Products
        </div>
        <div
          onClick={() => setPage(3)}
          className={
            page == 3 ? "dashboard-options selected-page" : "dashboard-options"
          }
        >
          Orders
        </div>
      </div>

      {page == 1 && (
        <>
          <ListingProducts page="draft" products={draft} />
          {user.role != "customer" && (
            <FloatButton onClick={showModal} icon={<PlusOutlined />} />
          )}
          {isModalOpen && (
            <AddProduct
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          )}
        </>
      )}
      {page == 2 && (
        <>
          <ListingProducts page="myProducts" products={filteredProducts} />
          {user.role != "customer" && (
            <FloatButton onClick={showModal} icon={<PlusOutlined />} />
          )}
          {isModalOpen && (
            <AddProduct
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          )}
        </>
      )}

      {page == 3 && (
        <>
          

          <div className="cart-container">
            <div className="cart-details">

              {orders &&
                orders.map((cart) => {

                  return (
                    <ShowCartItem
                    cart={cart}
                    setTotalDiscount={setTotalDiscount}
                    setTotalPrice={setTotalPrice}
                      page="myorder"
                      cartItems={orders}
                      setCartItems={setOrders}
                    />
                  );
                })}
            </div>
            <div className="place-order">
              <div>
                <h2>Total Earnings</h2>
                <Divider />
              </div>
              <h4>Total Items Sold ({orders.length})</h4>

              <div className="mrp-details">
                <div>Total Items Sold</div>
                <div>{orders.length}</div>
              </div>
              <div className="mrp-details">
                <div>Total MRP Price</div>
                <div>{totalPrice  }</div>
              </div>
              <div className="mrp-details">
                <div>Total Buying Price</div>
                <div>{totalDiscount}</div>
              </div>
              <Divider />
              <div className="mrp-details">
                <h1>Total Profit</h1>
                <h2>{totalDiscount}</h2>
              </div>
              {/* <button
                onClick={() => console.log("first")}
                className="product-page-add-to-cart"
              >
                Place Order
              </button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default YourProducts;
