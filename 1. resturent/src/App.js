import React, { useState, useEffect } from 'react';
import './App.css';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BackendLink } from './Api/BackendLink';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import HomePage from './pages/HomePage';
import ResturentPage from './pages/ResturentPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import CreateBusinessAccount from './pages/CreateBusinessAccount';
import CreateDeliverAccount from './pages/CreateDeliverAccount';
import AddResturentPage from './pages/AddResturentPage';
import AddRiderPage from './pages/AddRiderPage';
import AddResturentItems from './pages/AddResturentItems';
import SearchPage from './pages/SearchPage';

function App() {
  const [ProfileID, setProfileID] = useState()
  const [ProfileItem, setProfileItem] = useState(undefined)
  const [UserItem, setUserItem] = useState(undefined)
  const [UserResturents, setUserResturents] = useState(undefined)


  //Get Profile datas
  useEffect(() => {
    try {
      const accestoken = localStorage.getItem("accestoken")
      const content_decoded = jwt_decode(accestoken)

      axios.post(`${BackendLink}/api/users/profile`, {
        id: content_decoded.user_id
      })
        .then((res) => {
          setProfileItem(res.data);
          setUserResturents(res.data.returent);
        })
    } catch {
      console.log("Wrong bra");
    }
  }, [ProfileID])


  useEffect(() => {
    try {
      axios.post(`${BackendLink}/api/users/user`, {
        id: ProfileItem.user
      })
        .then((res) => {
          setUserItem(res.data);
        })
    }
    catch {
      console.log("Wrong bra");
    }
  }, [ProfileItem])


  //Initial Rendearing
  return (
    <div className="App">
      <Router>
        <AnimatePresence initial={true} exitBeforeEnter>
          <Switch>
            <Route exact path='/' render={() => <HomePage
              ProfileItem={ProfileItem} UserItem={UserItem}
              setProfileItem={setProfileItem} setUserItem={setUserItem}
              ProfileID={ProfileID}
            />} />
            <Route exact path='/returent/:id' render={() => <ResturentPage
              ProfileItem={ProfileItem} UserItem={UserItem}
              setProfileItem={setProfileItem} setUserItem={setUserItem}
            />} />
            <Route exact path='/signup' render={() => <SignUpPage />} />
            <Route exact path='/login' render={() => <LogInPage
              setProfileID={setProfileID}
            />} />
            <Route exact path='/create/business' render={() => <CreateBusinessAccount />} />
            <Route exact path='/create/ride' render={() => <CreateDeliverAccount />} />
            <Route exact path='/add/resturent' render={() => <AddResturentPage
              ProfileItem={ProfileItem} UserItem={UserItem}
              UserResturents={UserResturents} setUserResturents={setUserResturents}
            />} />
            <Route exact path='/add/rider' render={() => <AddRiderPage
              ProfileItem={ProfileItem} UserItem={UserItem}
            />} />
            <Route exact path='/add/item/:id' render={() => <AddResturentItems
              ProfileItem={ProfileItem} UserItem={UserItem}
            />} />
            <Route exact path='/search/:str' render={() => <SearchPage 
              ProfileItem={ProfileItem} UserItem={UserItem}
              ProfileID={ProfileID}
            />} />
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;