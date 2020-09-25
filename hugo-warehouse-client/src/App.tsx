import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Menu } from 'antd';
import { useSelector } from 'react-redux'
import { RootState } from './Store'
import { loginByToken, logout } from './Entitites/Auth/repository';

import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products/index';
import Categories from './Pages/Categories';
import Providers from './Pages/Providers';
import Operations from './Pages/Operations';
import Users from './Pages/Users'

const App = () => {
  const isAuthenticated = useSelector<RootState>(state => state.auth_reducer.isAuthenticated);

  useEffect(() => {
    loginByToken();
  }, [])

  console.log("Store of auth", isAuthenticated);

  if (isAuthenticated === false)
    return (
      <Switch>
        <Route path="*" >
          <Login />
        </Route>
      </Switch>
    )
  return (
    <main className="App ">

      <section className="row">
        <div className="col-12">
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/" />Inicio</Menu.Item>
            <Menu.Item key="6"><Link to="/operaciones" />Entrada y Salida</Menu.Item>
            <Menu.Item key="4"><Link to="/categorias" />Categorias</Menu.Item>
            <Menu.Item key="7"><Link to="/proveedores" />Proveedores </Menu.Item>
            <Menu.Item key="2"><Link to="/productos" />Productos</Menu.Item>
            <Menu.Item key="3"><Link to="/usuarios" />Usuarios</Menu.Item>
            <Menu.Item key="8" style={{ float: 'right' }} onClick={() => {
              return logout()
            }}> Cerrar Sesión</Menu.Item>
          </Menu>
        </div>
      </section>

      <div className="container mt-5">
        <section className="row">
          <div className="col-12">
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>

              <Route path="/usuarios" >
                <Users />
              </Route>

              <Route path="/operaciones" >
                <Operations />
              </Route>


              <Route exact path="/productos" >
                <Products />
              </Route>

              <Route exact path="/categorias">
                <Categories />
              </Route>

              <Route exact path="/proveedores">
                <Providers />
              </Route>

              <Route path="*">
                <Dashboard />
              </Route>

            </Switch>
          </div>
        </section>
      </div>

    </main>
  );
}

export default App