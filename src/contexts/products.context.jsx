import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

// when we want to add it only for first time, otherwise it is called everytime and data might update. if we want to update the data we can fir it again.
  // useEffect(()=>{
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // },[]);
  // 
  const value = { products };
  
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};