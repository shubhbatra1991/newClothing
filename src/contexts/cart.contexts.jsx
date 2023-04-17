import { createContext, useEffect, useState, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains product to add.
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    if(existingCartItem){
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity +1}
        :cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );


    //check if quantity is equal to 1, then remove others
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    //return back as selected with reduced quty
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        :cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartitems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen:false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const cartReducer = (state,action) => {
    const { type, payload }= action;

    switch(type){
        case  'SET_CART_ITEMS':
            return {
                ...state,
                ...payload  
            }
        default: 
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}





export const CartProvider =({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const[cartCount, setCartCount] = useState(0);
    // const[cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    //     setCartCount(newCartCount);
    // },[cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    //     setCartTotal(newCartTotal);
    // },[cartItems]);

    const { cartItems,cartCount,cartTotal, isCartOpen } = state;
    const[ state, dispatch ] = useReducer(cartReducer,INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems)=>{
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        
        
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }});

    }



    const addItemToCart = (product) => {
        const newCartitems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartitems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartitems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartitems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartitems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartitems);
    }

    const value = { isCartOpen: true, setIsCartOpen: () => {}, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};