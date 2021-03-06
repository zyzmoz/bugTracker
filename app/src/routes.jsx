import Dashboard from './views/Dashboard';
import Issue from './views/Issue';
import  Development from './views/Development';
import Users from './views/Users';
import Customers from './views/Customers';
import Projects from './views/Projects';


const routes = [
  {
    title: 'Dashboard',
    component: Dashboard,
    path: '/',
    subRoutes: []
  },
  {
    title: 'Suporte',
    component: Issue,
    path: '/helpdesk',
    subRoutes: []
  },
  {
    title: 'Desenvolvimento',
    component: Development,
    path: '/development',
    subRoutes: []
  },
  
  {
    title: 'Cadastros',    
    subRoutes: [
      {
        title: 'Técnicos',
        component: Users,
        path: '/users',     
      },
      {
        title: 'Clientes',
        component: Customers,
        path: '/customers',     
      },
      {
        title: 'Sistemas',
        component: Projects,
        path: '/projects',     
      },
  ]}
]

export default routes;