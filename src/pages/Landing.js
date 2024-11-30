import Logo from '../components/Logo'
import main from '../assets/images/main-alternative.svg'
import Wrapper  from '../assets/wrappers/LandingPage'


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav> 
        <div className="container page">
            <div className="info">
                <h1> job <span>tracking</span> app

                </h1>
                <p>hhhhhhhhhhhhhhhhhhhh</p>
                <button  className='btn btn-hero'>Login/Register</button>
            </div>
            <img src ={main} alt='job hunt' className='img main-img' ></img>

        </div>
      
    </Wrapper>
  )
}


export default Landing
