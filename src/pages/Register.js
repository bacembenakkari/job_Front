import { useState, useEffect } from 'react'
import { Logo ,FormRow , Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'
 
const initialState = {
    name :'',
    email:'',
    password:'',
    isMember:'',
    showAlert: true,

}






const Register = ()=> {
    const {user , isLoading,showAlert ,displayAlert, registerUser ,loginUser,setupUser} = useAppContext()
    const navigate = useNavigate()    
    const [values,setValues] = useState(initialState)
    const toggleMember = () => {
        setValues({...values, isMember:!values.isMember })
    }

const handleChange =(e) =>{
    setValues({...values,[e.target.name]: e.target.value})
}

const onSubmit =(e) => {

    e.preventDefault()
    const {name,email,password,isMember} = values
    if (!email || !password || (!isMember && !name)){
        console.log("object")
        displayAlert()
        return
    }
    const currentUser = {name,email,password}
    console.log("eeeeee",currentUser)
    
    if(isMember){
        console.log('tsr')
        //setupUser({currentUser,endPoint:'login',alertText:'login successful! Redirecting ...',})
        setupUser({currentUser ,endPoint:'login',alertText:'login successful! Redirecting ...'})
    }
    else{
        
        registerUser(currentUser)
    }
    
}
    useEffect(()=>{
        if(user){
            console.log(user)
            setTimeout(()=>{
                //clearStorage()
                navigate('/')

            },3000)
        
    }

},[user,navigate])

return <Wrapper className='full-page'>
    <form className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember ? 'Login': 'Register'}</h3>
        {values.showAlert && <Alert/> }

        {/* name input*/}
        {!values.isMember && (
        <FormRow type="Text" name="name" value={values.name} handleChange={handleChange}/>
        )}
        {/* email input*/}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>
        {/* password input*/}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
            submit 
        </button>
        <p>
            {values.isMember?'Not a Member yet?':'Already a member'}
            <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember? 'Register' : 'Login'}
            </button>
        </p>
         
    </form>
</Wrapper>

}

export default Register