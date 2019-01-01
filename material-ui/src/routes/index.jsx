import Dashboard from "layouts/Dashboard/Dashboard.jsx";

const proxy = (prop) => {
  window.location=`http://localhost:3002${prop.location.pathname}`;
  return null;
};

const indexRoutes = [
  {
    path: "/auth",
    component: proxy
  },
  {
    path: "/api",
    component: proxy
  },
  {
    path: "/",
    component: Dashboard
  }
];

export default indexRoutes;
