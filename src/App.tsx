import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
} from "./pages";

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <Route render={() => <h1>404 not found 页面去火星了！</h1>} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
