import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm } from 'antd';
import { Category } from '../../Interfaces/categories.interface';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getAll, remove } from '../../Entitites/Category/repository';

const { Column } = Table;

const Categories = () => {
  const [entities, setEntities] = useState<Category[]>();
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

    await remove(v)
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

  if (entities === undefined) return (<div>Cargando...</div>)

  return (
    <main>


      <div className="row justify-content-end">

        <div className="col-auto">

          <Button>
            Agregar nueva entidad
          </Button>
        </div>
      </div>

      <div className="row">

        <div className="col-12">

          <Table dataSource={entities} bordered size={"small"} loading={loading} className="mt-3" rowKey="id">
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

            <Column<Category>
              title='ID'
              dataIndex='id'
              key='od'
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

        </div>
      </div>


      {/* <Modal visible={isModalOpen}>

        <Spin spinning={isModalLoading} tip={"Cargando..."}>
          <Form
            form={form}
            name="basic"
          >
            <Form.Item
              hidden
              name="id"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Usuario"
              name="userName"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="roleId"
              rules={[{ required: true, message: 'Valor requerido' }]}
            >
              <Select >
                {roles?.map(x =>
                  <Option key={x.id} value={x.id}>{x.name}</Option>
                )}
              </Select>
            </Form.Item>

          </Form>
        </Spin>
      </Modal> */}



    </main>
  )
}
export default Categories;