import React, { useEffect } from "react";
import styles from "./App.module.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from "./pages";
import { useSelector } from "store/hooks";
import { getShoppingCart } from "store/shoppingCart/slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "store";

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

function PrivateRoute({
  component,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) {
  const RouteComponent = (props: RouteComponentProps) => {
    return isAuthenticated ? (
      React.createElement(component!, props)
    ) : (
      <Redirect to={{ pathname: "/signIn", state: { from: rest.path } }} />
    );
  };
  return <Route render={RouteComponent} {...rest} />;
}

const App: React.FC = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (token == null) return;
    dispatch(getShoppingCart());
  }, [dispatch, token]);

  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={token != null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <PrivateRoute
            isAuthenticated={token != null}
            path="/placeOrder"
            component={PlaceOrderPage}
          />
          <Route render={() => <h1>404 not found 页面去火星了！</h1>} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
