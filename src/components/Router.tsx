import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

interface IProps {
  isLoggedIn: boolean;
  userObj: UserObj | null;
  refreshUser: () => void;
}

const AppRouter = ({ isLoggedIn, userObj, refreshUser }: IProps) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
