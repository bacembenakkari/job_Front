import  { BrowserRouter , Routes  , Route , Link} from 'react-router-dom'
import {Landing ,Error  ,Register,ProtectedRoute} from './pages' 
import {Profile,AllJobs,AddJob,Stats,SharedLayout} from './pages/dashboard'
function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path ='/' element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>}>
            <Route index element={<Stats/>}/>
            <Route path='all-job' element={<AllJobs/>}/>
            <Route path='add-job' element={<AddJob/>}/>
            <Route path='profile' element={<Profile/>}/>

          </Route>
          <Route path ='/register' element={<Register/>}/>
          <Route path ='/landing' element={<Landing/>}/>
          <Route path ='/*' element={<Error />}/>  
        </Routes>
    
      
    </BrowserRouter>
    
  );
}

export default App;
