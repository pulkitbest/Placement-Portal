import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import CvScreen from './screens/CvScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen}/>
          {/* <Route path='/placeorder' component={PlaceOrderScreen}/> */}
          <Route path='/placeorder/:id' component={PlaceOrderScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/profile' component={ProfileScreen} exact/>
          <Route path='/cv/:id' component={CvScreen}/>
          <Route path='/product/:id' component={ProductScreen} exact/>
          <Route path='/admin/userlist' component={UserListScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
          <Route path='/admin/productlist' component={ProductListScreen}/>
          <Route path='/admin/orderlist' component={OrderListScreen}/>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <Route path='/search/:keyword' component={HomeScreen}/>
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
