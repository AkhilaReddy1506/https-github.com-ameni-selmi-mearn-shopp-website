import Dashboard from "./components/adminComponents/Dashboard";
import ProductsList from "./components/adminComponents/ProductsList";
import UsersList from "./components/adminComponents/UsersList";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Addadmin from "./components/adminComponents/Addadmin";

var dashboardRoutes;
   dashboardRoutes = [
    
    {
      id : 1 ,
      path: "/",
      name: "Dashboard", 
      icon: <DashboardIcon /> ,
      component: Dashboard,
      layout: "/admin",
    },
 
    {
      id : 2 ,
      path: "/addadmin",
      name: "Add admin",
      icon: <PersonAddAltIcon />,
      component: Addadmin,
      layout: "/admin",
    },
    {
      id : 3 ,
      path: "/userslist",
      name: "Users List",
      icon: <PersonIcon />,
      component: UsersList,
      layout: "/admin",
    },
    {
      id : 4 ,
      path: "/productslist",
      name: "Products List",
      icon: <ArticleIcon/>,
      component: ProductsList,
      layout: "/admin",
    }
    
  ]


export default dashboardRoutes;
