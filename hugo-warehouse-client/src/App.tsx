import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation
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
import { AuthState } from './Entitites/Auth/interface';
import { BorderBottomOutlined } from '@ant-design/icons';

const homePath = "/";
const operationsPath = "/operaciones";
const categoriesPath = "/categorias";
const providersPath = "/proveedores";
const productsPath = "/products";
const usersPath = "/users";

const allowedRoles = ["admin", "developer"]

const App = () => {
  const { isAuthenticated, user } = useSelector<RootState, AuthState>(state => state.auth_reducer);
  const location = useLocation();

  useEffect(() => {
    loginByToken();
  }, [])

  if (isAuthenticated === null)   return (<div>Cargando...</div>)

  if (isAuthenticated === false || user === null)
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
          <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key={homePath} icon={<BorderBottomOutlined />} style={{ backgroundColor: "rgb(18, 99, 73)", color: "#FFF", fontWeight: "bold" }}><Link to={homePath} />Hugos Connect</Menu.Item>
            <Menu.Item key={operationsPath}><Link to={operationsPath} />Entrada y Salida (Operación)</Menu.Item>

            {allowedRoles.includes(user.role) ? <Menu.Item key={categoriesPath}><Link to={categoriesPath} />Categorias</Menu.Item> : null}
            {allowedRoles.includes(user.role) ? <Menu.Item key={providersPath}><Link to={providersPath} />Proveedores </Menu.Item> : null}
            {allowedRoles.includes(user.role) ? <Menu.Item key={productsPath}><Link to={productsPath} />Tipos de Producto</Menu.Item> : null}
            {allowedRoles.includes(user.role) ? <Menu.Item key={usersPath}><Link to={usersPath} />Usuarios</Menu.Item> : null}

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
              <Route exact path={homePath}>
                <Dashboard />
              </Route>

              <Route path={usersPath} >
                <Users />
              </Route>

              <Route path={operationsPath} >
                <Operations />
              </Route>

              <Route exact path={productsPath} >
                <Products />
              </Route>

              <Route exact path={categoriesPath}>
                <Categories />
              </Route>

              <Route exact path={providersPath}>
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