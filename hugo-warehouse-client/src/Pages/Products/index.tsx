import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm } from 'antd';
import { Product } from '../../Interfaces/products.interface';
import { getAll, deleteById } from '../../Services/products.service';
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

const { Column } = Table;

const Products = () => {
  const [products, setProducts] = useState<Product[]>();
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
        setProducts(response)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        console.error(e)
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

  return (
    <main>

      <div className="row justify-content-end">

        <div className="col-auto">

          <Button>
            <Link to={`${url}/agregar`}>Agregar nueva entidad</Link>
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">

          <Table dataSource={products} bordered size={"small"} loading={loading} className="mt-3" rowKey={"id"}
          >
            <Column
              title='#'
              key='id'
              render={(v) => (<div className="d-flex flex-row">
                <Popconfirm
                  title="¿Estás seguro de borrar esta categoría?"
                  onConfirm={() => confirm(v.id)}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="link" className="p-0 m-1">Borrar</Button>

                </Popconfirm>
                <Button type="link" className="p-0 m-1" onClick={() => history.push(`${url}/editar/${v.id}`)}>Editar</Button>
              </div>)}
            />

            <Column<Product>
              title='ID'
              dataIndex='id'
              key='id'
            />
            <Column<Product>
              title='Nombre'
              dataIndex='name'
              key='name'
            />
            <Column<Product>
              title='Precio'
              dataIndex='price'
              key='price'
            />
            <Column<Product>
              title='Descripción'
              dataIndex='description'
              key='description'
            />
            <Column<Product>
              title='Fecha de Registro'
              dataIndex='createdOn'
              key='createdOn'
            />
          </Table>
        </div>
      </div>
    </main>
  )
}
export default Products;