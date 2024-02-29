import './styles/global.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import ClientPage from './pages/client/ClientPage';
import EmployeesPage from './pages/employees/EmployeesPage';
import StoresPage from './pages/stores/StoresPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Login from './pages/login/Login';
import Employee from './pages/employee/Employee';
import Store from './pages/store/Store';
import ReportsPage from './pages/reports/ReportsPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {currentUser} = useContext(AuthContext)
  const RequireAuth = ({children})=>{
    return currentUser ? (children) : <Navigate to="/login"/>
  }
  console.log(currentUser)
  const Layout = ()=>{
    return (
      <div className='main'>
        <Navbar/>
        
        <div className='container'>
          <div className='menuContainer'>
            <Menu/>
          </div>
          <div className='contentContainer'>
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </div>
      
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout/>
        </RequireAuth>
      ),
      children:[
        {
          path: "/",
          element: (
            <ClientPage/>
          )
        },
        {
          path: "/employees",
          element: (
            <EmployeesPage/>
          )
        },
        {
          path: "/stores",
          element: (
            <StoresPage/>
          )
        },
        {
          path: "/reports",
          element: (
            <ReportsPage/>
          )
        },
        {
          path: "/employees/:id",
          element: (
            <Employee/>
          )
        },
        {
          path: "/stores/:id",
          element: (
            <Store/>
          )
        },
      ]
    },
    {
      path:"/login",
      element:<Login/>
    }
    
    
  ])
  return (
    <RouterProvider className='big' router={router}>

    </RouterProvider>
  );
}

export default App;
