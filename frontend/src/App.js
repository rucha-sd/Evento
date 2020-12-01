import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Components/Header'
import Home from './Screens/Home'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import Favourites from './Screens/Favourites';
import Bookings from './Screens/Bookings';
import Events from './Screens/Events';
import AddEvent from './Screens/AddEvent';
import Profile from './Screens/Profile';

function App() {
  return (
    <BrowserRouter primary={false}>
    <>
      <Header/>
      <main>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/signup" exact={true} component={Signup} />
            <Route path="/favourites" exact={true} component={Favourites} />
            <Route path="/bookings" exact={true} component={Bookings} />
            <Route path="/events" exact={true} component={Events} />
            <Route path="/events/add" exact={true} component={AddEvent} />
            <Route path="/profile" exact={true} component={Profile} />
          </Switch>
      </main>
    </>
  </BrowserRouter>
  );
}

export default App;
