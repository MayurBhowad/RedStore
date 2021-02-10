import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import home from './pages/home';
import Navbar from './components/layouts/Navbar';
import Products from './components/Products/Products';
import Footer from './components/layouts/Footer';
import ShoppingCart from './components/Shopping_cart/ShoppingCart';
import SingleProduct from './components/Products/SingleProduct';
import UserMain from './components/User/UserMain';
import Address from './components/User/Address';
import NotFoundRoute from './components/Common/NotFoundRoute';
import NotFound from './components/Not-Found/NotFound';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={home}></Route>
            </Switch>
            <Switch>
              <Route exact path="/products" component={Products}></Route>
            </Switch>
            <Switch>
              <Route exact path="/shopping_cart" component={ShoppingCart}></Route>
            </Switch>
            <Switch>
              <Route exact path="/single_product/:id" component={SingleProduct}></Route>
            </Switch>
            <Switch>
              <Route exact path="/user_auth" component={UserMain}></Route>
            </Switch>
            <Switch>
              <Route exact path="/user_address" component={Address}></Route>
            </Switch>
            <Route exact path="/not-found" component={NotFound}></Route>
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
