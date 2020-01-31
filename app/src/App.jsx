import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Layout from './Layout';
import 'foundation-sites/dist/css/foundation.min.css';

import { BrowserRouter as Router } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
};

export default App;