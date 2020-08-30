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
import moment from 'moment';
import DateRangePicker, { ValueType } from 'rsuite/lib/DateRangePicker';

const { Column } = Table;

const Products = () => {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [fireEffect, setFireEffect] = useState(true);
  const [rangePicker, setRangePicker] = useState<ValueType>([moment().subtract(30, 'd').toDate(), moment().toDate()])

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

  }, [fireEffect, rangePicker])

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

      <div className="row">
        <div className="col-6">
          <DateRangePicker
            placeholder="Fechas para reporte: "
            style={{ width: 280 }}
            value={rangePicker}
            cleanable={false}
            format={"MM-DD-YY"}
            onChange={(v) => setRangePicker(v)}
          />
        </div>

        <div className="col-6 d-flex justify-content-end align-items-center">

          <Button>
            <Link to={`${url}/agregar`}>Agregar nueva entidad</Link>
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Switch>
            <Route exact path={`${url}`}>
              <Table dataSource={products} bordered size={"small"} loading={loading} className="mt-3">
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

                <Column<Product>
                  title='ID'
                  dataIndex='key'
                  key='key'
                />
                <Column<Product>
                  title='Nombre'
                  dataIndex='name'
                  key='name'
                />
                <Column<Product>
                  title='Categoría'
                  dataIndex='categoryName'
                  key='categoryName'
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
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  )
}
export default Products;