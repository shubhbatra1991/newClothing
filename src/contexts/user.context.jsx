import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from "../utils/reducer/reducer.utils";

//Actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER' 
}

const userReducer= (state, action) =>{
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`unhandled type ${type} in hte user reducer`);
    }
}


const INITIAL_STATE ={
    currentUser: null
}


export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);

    const { currentUser } = state;
    // const [currentUser, setCurrentUser] = useState(null);
    // Insted of use state, i am using the reducer.

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    const value = { currentUser, setCurrentUser };

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if (user) {
                createUserDocumentFromAuth(user);
              }
              setCurrentUser(user);
        });

        return unsubscribe;

    },[]);

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    );
};