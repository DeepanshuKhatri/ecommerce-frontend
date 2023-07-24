import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Select, Table } from "antd";
import ListVendor from "../components/ListVendor";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    async function run() {
      const data = await axios.get("http://localhost:5000/getVendors");
      console.log(data.data);
      setVendors(data.data);
    }
    run();
  }, []);


  
  return (
    <div>
      <Navbar />

      <div className="vendor-list">
        {/* <Table dataSource={dataSource} columns={columns} />;
         */}

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendors &&
              vendors.map((vendor, index) => {
                return (
                  <ListVendor vendor={vendor}/>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
