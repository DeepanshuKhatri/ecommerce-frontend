import React, {useEffect, useState} from 'react'
import { Select } from 'antd'
import axios from 'axios';

const ListVendor = ({vendor}) => {
    const [disabled, setDisabled] = useState(vendor.disabled);
    useEffect(()=>{
        async function run(){
        const res = await axios.get('http://localhost:5000/getVendors', )
        setDisabled(vendor.disabled)
        console.log(vendor.disabled)
        }
        run();
    }, [])
    
    async function changeStatus(e){
        setDisabled(prev=> !prev)
        const res = await axios.post('http://localhost:5000/changeStatus', {id:vendor._id, disabled:!disabled})
        console.log(res.data)
        console.log(e)
      }
  return (
        <tr>
                    <td><div className={disabled===true ? "disabled-user": "active-user"}></div></td>
                    <td>{vendor.name}</td>
                    <td>{vendor.email}</td>
                    <td>
                      <Select
                        defaultValue={disabled===false? "Active": "Disable"}
                        style={{
                          width: 120,
                        }}
                        onChange={(e)=> changeStatus( e)}
                        options={[
                          {
                            value: "Disable",
                            label: "Disable",
                          },
                          {
                            value: "Active",
                            label: "Active",
                          },
                        ]}
                      />
                    </td>
                  </tr>
  )
}

export default ListVendor