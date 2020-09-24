import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Menu } from 'antd';
import { useSelector } from 'react-redux'
import { RootState } from './Store'
import { loginByStorageService } from './Services/auth.service';

//Login
import Login from './Pages/Login/LoginPage'

//Dashboard
import Dashboard from './Pages/Dashboard'

//Products
import Products from './Pages/Products';
import ProductAdd from './Pages/Products/ProductAdd';
import ProductUpdate from './Pages/Products/Update';

//Categories
import Categories from './Pages/Categories'
import CategoryAdd from './Pages/Categories/Add'
import CategoryUpdate from './Pages/Categories/Update'

//Users
import Users from './Pages/Users'

const App = () => {
  const isAuthenticated = useSelector<RootState>(state => state.auth_reducer.isAuthenticated);

  useEffect(() => {
    loginByStorageService();
  }, [])

  // console.log("Store of auth", isAuthenticated);

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
            <Menu.Item key="6"><Link to="/registro" />Entrada y Salida</Menu.Item>
            <Menu.Item key="4"><Link to="/categorias" />Categorias</Menu.Item>
            <Menu.Item key="2"><Link to="/productos" />Productos</Menu.Item>
            <Menu.Item key="3"><Link to="/usuarios" />Usuarios</Menu.Item>
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

              <Route exact path="/productos" >
                <Products />
              </Route>
              <Route path={`/productos/agregar`}>
                <ProductAdd />
              </Route>
              <Route path={`/productos/editar/:id`}>
                <ProductUpdate />
              </Route>

              <Route path="/usuarios" >
                <Users />
              </Route>

              <Route exact path="/categorias">
                <Categories />
              </Route>

              <Route path={`/categorias/editar/:id`}>
                <CategoryUpdate />
              </Route>

              <Route path={`/categorias/agregar`}>
                <CategoryAdd />
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