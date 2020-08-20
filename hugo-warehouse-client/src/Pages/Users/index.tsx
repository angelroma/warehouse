import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm } from 'antd';
import { User } from '../../Interfaces/users.interface';
import { getAll,  deleteById } from '../../Services/users.service';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
const { Column } = Table;

const MainEntity = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fireEffect, setFireEffect] = useState(true);
  let { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    console.log("Loading")
    setLoading(true)
    getAll()
      .then(response => {
        console.log(response)
        setUsers(response)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        notification["error"]({
          message: "Error",
          description:
            'No se pueden adquirir las entidades.',
        });
      })

  }, [fireEffect])

  async function confirm(v: number) {
    console.log(v)
    setLoading(true)

    await deleteById(v)
      .then(x => {
        notification["success"]({
          message: '¡Perfecto!',
          description:
            'La entidad se borró con éxito',
        });
      })
      .then(() => { swithFireEffect() })
      .catch(() => {
        notification["error"]({
          message: "Error",
          description:
            'La entidad no se puede borrar, contacte al administrador.',
        });
      })

    setLoading(false)
  }

  function swithFireEffect() {
    setFireEffect(!fireEffect)
  }

  if (users === null) return (<div>Cargando...</div>)

  return (
    <main>
      <div className="row">
        <div className="col-12">
          <Switch>

            <Route exact path={`${url}`}>

              <Link to={`${url}/agregar`}>Agregar nueva entidad</Link>

              <Table dataSource={users} bordered size={"small"} loading={loading} className="mt-3">
                <Column
                  title='#'
                  key='key'
                  render={(v) => (<div className="d-flex flex-row">
                    <Popconfirm
                      title="¿Estás seguro de borrar esta categoría?"
                      onConfirm={() => confirm(v.key)}
                      okText="Si"
                      cancelText="No"
                    >
                      <Button type="link" className="p-0 m-1">Borrar</Button>

                    </Popconfirm>
                    <Button type="link" className="p-0 m-1" onClick={() => history.push(`${url}/editar/${v.key}`)}>Editar</Button>
                  </div>)}
                />

                <Column<User>
                  title='ID'
                  dataIndex='key'
                  key='key'
                />
                  <Column<User>
                  title='Usuario'
                  dataIndex='username'
                  key='username'
                />
                <Column<User>
                  title='Nombre'
                  dataIndex='name'
                  key='name'
                />
                <Column<User>
                  title='Edad'
                  dataIndex='age'
                  key='age'
                />
                <Column<User>
                  title='Email'
                  dataIndex='email'
                  key='email'
                />
                    <Column<User>
                  title='Role'
                  dataIndex='roleName'
                  key='roleName'
                />
                <Column<User>
                  title='Fecha de Registro'
                  dataIndex='createdOn'
                  key='createdOn'
                />
              </Table>
            </Route>
           
          </Switch>


        </div>
      </div>
    </main>
  )
}
export default MainEntity;