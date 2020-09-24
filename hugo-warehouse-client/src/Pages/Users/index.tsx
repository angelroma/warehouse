import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm, Modal, Card, Form, Input, Select, Spin } from 'antd';
import { User } from '../../Interfaces/users.interface';
import { getAll as getAllUsers, remove } from '../../Entitites/User/repository'
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Role } from '../../Interfaces/roles.interface';
import { useForm } from 'antd/lib/form/Form';
const { Column } = Table;
const { Option } = Select;

const MainEntity = () => {
  let { url } = useRouteMatch();
  const history = useHistory();
  const [form] = useForm();

  const [users, setUsers] = useState<User[]>();
  const [roles, setRoles] = useState<Role[]>();
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  async function fetchAll() {
    try {
      await getAllUsers().then((users) => setUsers(users));
    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'No se pueden adquirir los usuarios.',
      });
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchAll().then(() => setLoading(false))
  }, [])

  async function confirm(v: number) {
    setLoading(true)

    await remove(v)
      .then(x => {
        notification["success"]({
          message: '¡Perfecto!',
          description:
            'La entidad se borró con éxito',
        });
      })
      .catch(() => {
        notification["error"]({
          message: "Error",
          description:
            'La entidad no se puede borrar, contacte al administrador.',
        });
      })

    setLoading(false)
  }



  async function handleOpenEmptyForm() {
    setIsModalOpen(true);
    setIsModalLoading(true);

  }

  async function handleOpenEditForm() {
    setIsModalOpen(true);
    setIsModalLoading(true);
  }

  return (
    <main>
      <div className="row justify-content-end">

        <div className="col-auto">
          <Button onClick={() => handleOpenEmptyForm()}>
            Agregar nueva entidad
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table dataSource={users} bordered size={"small"} loading={loading} className="mt-3" rowKey="id">
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
                <Button type="link" className="p-0 m-1" onClick={() => handleOpenEditForm()}>Editar</Button>
              </div>)}
            />

            <Column<User>
              title='ID'
              dataIndex='id'
              key='id'
            />
            <Column<User>
              title='Usuario'
              dataIndex='userName'
              key='userName'
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
              title='Fecha de Registro'
              dataIndex='createdOn'
              key='createdOn'
            />
          </Table>
        </div>
      </div>

      <Modal visible={isModalOpen}>

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
      </Modal>


    </main>
  )
}
export default MainEntity;