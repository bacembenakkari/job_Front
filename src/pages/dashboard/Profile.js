import { useState } from "react"
import { FormRow , Alert } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"

const Profile = () =>{
    const { user ,showAlert,displayAlert,updateUser , isLoading} = useAppContext()
    const [name,setName]= useState(user?.name)
    const [email,setEmail]= useState(user?.email)
    const [lastName,setLastName]= useState(user?.lastName)
    const [location,setLocation]= useState(user?.location)
    const handlesubmit=(e) =>{
        e.preventDefault()
        // remove while testing
       // if(!name || !email || !lastName || !location ){
         //  displayAlert()
           // return
       // }
        

        updateUser({email,name,lastName,location});
    }
    return (
        <Wrapper>
            <form className='form' onSubmit={handlesubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    <FormRow type="text" name="name" value={name} handleChange={(e)=> setName(e.target.value )} />
                    <FormRow type="text" labelText="last name" name="lastName" value={lastName} handleChange={(e)=> setLastName(e.target.value )} />
                    <FormRow type="text" name="email" value={email} handleChange={(e)=> setEmail(e.target.value)} />
                    <FormRow type="text" name="location" value={location} handleChange={(e)=> setLocation(e.target.value)} />
                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading?'please wait...':'save changes'}
                    </button>


                </div>
            </form>

        </Wrapper>
    )
}
export default Profile