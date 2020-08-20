import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm } from 'antd';
import { Category } from '../../Interfaces/categories.interface';
import { getAll, deleteById } from '../../Services/categories.service';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import CategoryUpdate from './Update';
import CategoryAdd from './Add';
const { Column } = Table;

const Categories = () => {
  const [entities, setEntities] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fireEffect, setFireEffect] = useState(true);
  let { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    console.log("Loading")
    setLoading(true)
    getAll()
      .then(response => {
        setEntities(response)
        setLoading(false)
      })
      .catch(e => {
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

  if (entities === null) return (<div>Cargando...</div>)

  return (
    <main>
      <div className="row">
        <div className="col-12">


          <Switch>

            <Route exact path={`${url}`}>

              <Link to={`${url}/agregar`}>Agregar nueva entidad</Link>

              <Table dataSource={entities} bordered size={"small"} loading={loading} className="mt-3">
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

                <Column<Category>
                  title='ID'
                  dataIndex='key'
                  key='key'
                />
                <Column<Category>
                  title='Nombre'
                  dataIndex='name'
                  key='name'
                />
                <Column<Category>
                  title='Descripción'
                  dataIndex='description'
                  key='description'
                />
                <Column<Category>
                  title='Fecha de Registro'
                  dataIndex='createdOn'
                  key='createdOn'
                />
              </Table>
            </Route>
            <Route path={`${url}/editar/:id`}>
              <CategoryUpdate />
            </Route>

            <Route path={`${url}/agregar`}>
              <CategoryAdd setFireEffect={swithFireEffect} />
            </Route>
          </Switch>


        </div>
      </div>
    </main>
  )
}
export default Categories;