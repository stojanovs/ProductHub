import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import Header from "./component/Header";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import LoginScreen from "./container/LoginScreen/LoginScreen";

import UserRegistration from "./container/Registration/UserRegistration";
import ProductForm from "./container/productform";
import PublicRoute from "./routing/PublicRoute";
import PrivateRoute from "./routing/PrivateRoute";
import ProductEditScreen from "./container/ProductEdit";
import UserProfile from "./container/UserProfile";

const theme = createTheme({});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Header />
          <main className="py-3">
            <Switch>
              <PublicRoute path="/register" exact component={UserRegistration} />

              <PublicRoute path="/userlogin" exact component={LoginScreen} />
              <PrivateRoute path="/" exact component={ProductForm} />
              <PrivateRoute path="/productform" exact component={ProductForm} />
              <PrivateRoute
                path="/productedit/:productId/edit"
                exact
                component={ProductEditScreen}
              />
              <PrivateRoute path="/profile" exact component={UserProfile} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
