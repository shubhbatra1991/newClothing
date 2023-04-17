import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

// when we want to add it only for first time, otherwise it is called everytime and data might update. if we want to update the data we can fir it again.
  // useEffect(()=>{
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // },[]);
  // 

  //for extracting a db, we use useeffect
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  },[]);


  const value = { categoriesMap };
  
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};