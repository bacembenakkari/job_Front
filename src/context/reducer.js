import { CLEAR_ALERT, DISPLAY_ALERT ,REGISTER_USER_BEGIN ,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
LOGIN_USER_BEGIN,
LOGIN_USER_SUCCESS,
LOGIN_USER_ERROR,
SETUP_USER_BEGIN,
SETUP_USER_SUCCESS,
SETUP_USER_ERROR,
TOGGLE_SIDEBAR,
LOGOUT_USER,
UPDATE_USER_BEGIN,
UPDATE_USER_SUCCESS,
UPDATE_USER_ERROR,  } from "./actions"
import { initialState } from "./appContext"
const reducer = (state,action) => {
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert:true,
            alertType:'danger', 
            alertText:'please provide all values!'
        }
    }
    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert:false,
            alertType:'', 
            alertText:'',
        }
    }

    if(action.type === REGISTER_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return {...state,isLoading:false ,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType:'success',
            alertText:'User Created! Redirecting ...',
        }

    }
    if(action.type === REGISTER_USER_ERROR){
        return {...state,
            isLoading: false ,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }

    }
    if(action.type === LOGIN_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type === LOGIN_USER_SUCCESS){
        return {...state,isLoading:false ,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType:'success',
            alertText:'login successful! Redirecting ...',
        }

    }
    if(action.type === LOGIN_USER_ERROR){
        return {...state,
            isLoading: false ,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }

    }
    if(action.type === SETUP_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type === SETUP_USER_SUCCESS){
        return {...state,isLoading:false ,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType:'success',
            alertText: action.payload.alertText,
        }

    }
    if(action.type === SETUP_USER_ERROR){
        return {...state,
            isLoading: false ,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }

    }
    if(action.type === TOGGLE_SIDEBAR){
        return {...state,
            showSidebar:!state.showSidebar,
            
        }

    }
    if(action.type === LOGOUT_USER){
        return {...initialState,
        user:null,
        token:null,
        joblocation:'', 
        userLocation:'',   }
    }
    if(action.type === UPDATE_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return {...state,isLoading:false ,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType:'success',
            alertText: 'User Profile Updated',
        }

    }
    if(action.type === UPDATE_USER_ERROR){
        return {...state,
            isLoading: false ,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }

    }
    throw new Error ('no such action : ${action.type}')
}
export default reducer 