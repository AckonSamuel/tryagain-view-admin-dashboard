/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Instruments from "layouts/applications/instruments/admin";
import Logout from "layouts/authentication/sign-out";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Category from "layouts/applications/categories";
import Lab from "layouts/applications/labs";
import InstrumentDetails from "./layouts/applications/instruments/instrument-details";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Instruments",
    key: "instruments",
    icon: <Icon fontSize="small">note</Icon>,
    route: "/instruments",
    component: <Instruments />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "Category",
    icon: <Icon fontSize="small">item</Icon>,
    route: "/Categories",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Labs",
    key: "Labs",
    icon: <Icon fontSize="small">item</Icon>,
    route: "/Labs",
    component: <Lab />,
  },
  {
    // type: "collapse",
    name: "Signout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/admin/logout",
    component: <Logout />,
  },
  {
    // type: "collapse",
    name: "Sign-in",
    key: "sign-in",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    // type: "collapse",
    name: "Sign-up",
    key: "sign-up",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    route: "/:common",
    key: "details",
    name: "details",
    component: <InstrumentDetails />,
  },
];

export default routes;
