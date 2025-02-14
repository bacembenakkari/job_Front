
import React ,{ useState,useReducer,useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT , CLEAR_ALERT ,REGISTER_USER_BEGIN ,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR ,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    } from "./actions"
import  axios from 'axios'
import { authFetch, getAuth } from "./api";
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user:user? user:null,
    token:token,
    userLocation:userlocation || '',
    jobLocation:userlocation ||'',
    showSidebar:false,

}
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer,initialState)
    // axios 
    const authFetch = axios.create({
        baseURL:'/api/v1',
    })
 
    //request 
    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization']= `Bearer ${state.token}`
    return config
    },
    (error)=>{
        return Promise.reject(error)
    })

    //response
    authFetch.interceptors.response.use((response)=>{ 
    return response
    },
    (error)=>{
        console.log(error.response)
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })


    const displayAlert =() =>{
        dispatch({ type: DISPLAY_ALERT })
    }
    const clearAlert = () =>{

        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT})
            
        }, 3000)
    } 
    const addUserToLocalStorage = ({user,token,location}) =>{
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
        localStorage.setItem('location',location)
    }
    const removeUserFromLocalStorage = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }
    const registerUser = async (currentUser) =>{
        dispatch({ type:REGISTER_USER_BEGIN})
        try{
            const {data}  = await getAuth.post('/auth/register',currentUser)
            console.log(data);
            const { user ,token,location} = data
            dispatch({type:REGISTER_USER_SUCCESS,
                payload:{ user , token , location },
            })

            addUserToLocalStorage({ user,token,location})
            // local storage later



        } catch (error){
            console.log(error.response);
            dispatch({type:REGISTER_USER_ERROR,
            payload: {msg:error.response.data.msg},})

             
        }
        clearAlert()

    }
    const loginUser = async (currentUser) =>{
        dispatch({ type:LOGIN_USER_BEGIN})
        try{
            const {data}  = await getAuth.post('/auth/login',currentUser)
            const { user ,token,location} = data
            console.log("objectdsdss",data)
            dispatch({type:LOGIN_USER_SUCCESS,
                payload:{ user , token , location },
            })

            addUserToLocalStorage({ user,token,location})
            // local storage later



        } catch (error){
            dispatch({type:LOGIN_USER_ERROR,
            payload: {msg:error.response.data.msg},})

             
        }
        clearAlert()

    }
    const setupUser = async ({currentUser,endPoint,alertText}) =>{
        dispatch({ type:SETUP_USER_BEGIN})
        try{
            const {data} = await getAuth.post(`/auth/${endPoint}`,currentUser)
            const { user ,token,location} =data
            console.log('object',data)
            dispatch({type:SETUP_USER_SUCCESS,
                payload:{ user , token , location ,alertText},
            })

            addUserToLocalStorage({ user,token,location})
            // local storage later 



        } catch (error){
            dispatch({type:SETUP_USER_ERROR,
            payload: {msg:error.response.data.msg},})

             
        }
        clearAlert()

    }
    const toggleSidebar = () =>{
        dispatch({type: TOGGLE_SIDEBAR})
    }
    const logoutUser = () =>{
        dispatch({type:LOGOUT_USER})
        removeUserFromLocalStorage()
    }
    const updateUser = async ({email,name,lastName,location}) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
             const currentUser= {email,name,lastName,location}
             console.log("jjjj",currentUser)
            const response = await getAuth.patch('/auth/updateUser', currentUser , {
                headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
            });
            console.log('Update User Response:', response); // Log response object for debugging
            if (response && response.data) {
                const { user, location, token } = response.data;
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: { user, location, token },
                });
                addUserToLocalStorage({ user, location, token });
                clearAlert();
            } else {
                throw new Error('Response data is undefined');
            }
        } catch (error) {
            console.log('Update User Error:', error); // Log error object for debugging
            let errorMessage = 'An error occurred';
            if (error.response?.data?.msg) {
                errorMessage = error.response.data.msg;
            } else if (error.response?.status) {
                errorMessage = `Error status: ${error.response.status}`;
            } else if (error.message) {
                errorMessage = error.message;
            }
            if(error.response.status !==401){
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: errorMessage },
                });

            }
           
            clearAlert();
        }
    };
    
    

    return (
        <AppContext.Provider value={{...state,displayAlert,registerUser,loginUser,setupUser,toggleSidebar,logoutUser,updateUser}}>{children}
        </AppContext.Provider>
    )
}
const useAppContext = () =>{
    return useContext(AppContext)
}


export {AppProvider,initialState,useAppContext}