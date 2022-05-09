import Dashboard from "./components/adminComponents/Dashboard";
import ProductsList from "./components/adminComponents/ProductsList";
import UsersList from "./components/adminComponents/UsersList";

var dashboardRoutes;
   dashboardRoutes = [
    
    {
      path: "/dashboard",
      name: "Dashboard", 
      icon: "nc-icon nc-alien-33",
      component: Dashboard,
      layout: "/admin",
    },
 
    {
      path: "/userslist",
      name: "Users List",
      icon: "nc-icon nc-single-copy-04",
      component: UsersList,
      layout: "/admin",
    },
    {
      path: "/productslist",
      name: "Products List",
      icon: "nc-icon nc-layers-3",
      component: ProductsList,
      layout: "/admin",
    }
    
  ]


export default dashboardRoutes;
