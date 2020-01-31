import React from 'react';
import Menu from './components/Menu/Menu';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const createRoutes = () => {
  let auxRoutes = [];
  routes.map(route => {
    let { subRoutes } = route;
    if (subRoutes && subRoutes.length > 0) {
      route.subRoutes.map(subRoute => auxRoutes.push(subRoute));
    } else {
      auxRoutes.push(route);
    }
  });  
  return auxRoutes;

}

const Layout = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.sideMenu}>
          <Menu />
        </div>
        <div style={styles.mainView}>          
          <Switch>
            {createRoutes().map((route, i) => 
              <Route key={i} exact path={route.path} component={route.component} />
            
            )}
          </Switch>
        </div>
      </div>

    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    height: '100vh',
    userSelect: 'none'

  },
  content: {
    display: 'flex',
    height: '100%'
  },
  sideMenu: {
    width: '280px',
    height: '100%',
    background: '#f2f2f2'
  },
  mainView: {
    width: '100%',
    height: '100%',
    padding: '12px'
  }
}

export default Layout;