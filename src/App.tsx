import React from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainFooter from "./components/Navigation/MainFooter";
import MainPage from "./pages/MainPage/MainPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserOrders from "./pages/UserOrders/UserOrders";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
    return (
        <>
            <MainHeader/>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>

                <Route path="/contacts" exact>
                    <ContactsPage/>
                </Route>

                <Route path="/products/:page" exact>
                    <ProductsPage/>
                </Route>

                <Route path="/registration" exact>
                    <RegistrationPage/>
                </Route>

                <Route path="/login" exact>
                    <LoginPage/>
                </Route>

                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>

                <Route path="/orders" exact>
                    <UserOrders/>
                </Route>

                <Route path="/product/:prodId" exact>
                    <ProductDetailsPage/>
                </Route>

                <Route path="/order/details" exact>
                    <OrderDetailsPage/>
                </Route>

                <Route path="/admin/add-product" exact>
                    <AdminPage/>
                </Route>

                <Route path='/*'>
                    <MainPage/>
                </Route>
            </Switch>
            {/*<div style={{height: "100vh"}}></div>*/}
            <MainFooter/>
        </>
    );
}

export default App;
