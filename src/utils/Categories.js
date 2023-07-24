import {MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

const items = [
    getItem('Electronics', 'sub1', null, [
        getItem('Mobiles', 'mobiles'),
        getItem('Laptops', 'laptops'),
    ]),
    
    getItem('Men', 'sub2', null, [
      getItem('Shirt', 'menShirt'),
      getItem('T-Shirt', 'menTShirt'),
      getItem('Jeans', 'menJeans'),
      getItem('Shoes', 'menShoes')

    ]),
    getItem('Kitchen', 'sub4',null, [
        getItem('Grocerry', 'grocerry'),
        getItem('Utensils', 'utensils'),
    ]),
    getItem('Women', 'sub3',null, [
        getItem('Shirt', 'womenShirt'),
        getItem('T-Shirt', 'womenTShirt'),
        getItem('Jeans', 'womenJeans'),
        getItem('Shoes', 'womenShoes')
    ]),
  ];


  export default items;