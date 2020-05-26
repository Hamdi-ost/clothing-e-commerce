import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component';
import  CheckoutPage  from "./pages/checkout/checkout.component";
import HomePage from './pages/homepage/homepage.component'

import  Header  from './components/header/header.compoenets';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";


class App extends React.Component  {
   
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {
    //   //this.setState({ currentUser: user});
      
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
 
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     });
    //   } else {
    //     setCurrentUser( userAuth );
    //   }
    //   // Data to Firebase
    //   // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })))

    // })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route  path='/shop' component={ShopPage}/>
          <Route  path='/checkout' component={CheckoutPage}/>
          <Route  exact path='/signin' render = {() => 
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUp />
            )
          }/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(App);
