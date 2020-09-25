import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm, Modal, Form, Input, Select, Spin } from 'antd';
import { User } from '../../Entitites/User/interface';
import { add, getAll as getAllUsers, remove, update, getById, getAll } from '../../Entitites/User/repository'
import { useForm } from 'antd/lib/form/Form';
import { getAll as getAllRoles } from '../../Entitites/Role/repository';
import { Role } from '../../Entitites/Role/interface';
import moment from 'moment';

const { Column } = Table;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 }
}

const MainEntity = () => {
  const [form] = useForm();

  const [roles, setRoles] = useState<Role[]>();
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

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
    setLoading(true);

    try {
      await remove(v);
      await getAll().then((result) => setUsers(result));

      notification["success"]({
        message: '¡Perfecto!',
        description:
          'La entidad se borró con éxito',
      });
    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'La entidad no se puede borrar, contacte al administrador.',
      });
    }

    setLoading(false)
  }

  async function handleOpenEmptyForm() {
    setIsModalOpen(true);
    setIsModalLoading(true);
    form.resetFields();

    getAllRoles().then((roles) => setRoles(roles));
    setIsModalLoading(false);
  }

  async function handleOpenEditForm(id: number) {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const entityToEdit = await getById(id);
      getAllRoles().then((roles) => setRoles(roles));

      form.setFieldsValue(entityToEdit);
      setIsModalLoading(false);

    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'Hay un error al actualizar o al actualizar.',
      });
      setIsModalLoading(false);
    }
  }

  async function handleSaveForm() {
    await form.validateFields();

    try {
      setIsSavingForm(true)

      const userForm = form.getFieldsValue() as User;

      userForm.createdOn = moment().toDate();

      if (userForm.id === undefined) {
        await add(userForm);
      }
      else await update(userForm.id, userForm);

      await fetchAll();

      setIsSavingForm(false);
      setIsModalOpen(false);
    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'Hay un error al actualizar o al actualizar.',
      });
      setIsSavingForm(false);
    }
  }

  async function handleCancelForm() {
    setIsSavingForm(false);
    setIsModalOpen(false);
    form.resetFields();
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
            <Column<User>
              title='#'
              key='id'
              render={(v) => (<div className="d-flex flex-row">
                <Popconfirm
                  title="La entidad solo se podrá borrar si no tiene dependientes."
                  onConfirm={() => confirm(v.id)}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="link" className="p-0 m-1">Borrar</Button>

                </Popconfirm>
                <Button type="link" className="p-0 m-1" onClick={() => handleOpenEditForm(v.id)} >Editar</Button>
              </div>)}
            />

            <Column<User>
              title='ID'
              dataIndex='id'
            />
            <Column<User>
              title='Usuario'
              dataIndex='userName'
            />
            <Column<User>
              title='Nombre'
              dataIndex='name'
            />
            <Column<User>
              title='Edad'
              dataIndex='age'
            />
            <Column<User>
              title='Email'
              dataIndex='email'
            />
            <Column<User>
              title='Rol'
              dataIndex={['role', 'name']}
            />
            <Column<User>
              title='Fecha de Registro'
              dataIndex='createdOn'
            />
          </Table>
        </div>
      </div>

      <Modal
        title={"Formulario"}
        visible={isModalOpen}
        onOk={() => handleSaveForm()}
        onCancel={() => handleCancelForm()}
        confirmLoading={isSavingForm}
      >
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
              {...layout}
            >
              <Input
                placeholder="Escribe tu nombre de usuario"
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu contraseña"
                type="password" />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu nombre completo"
              />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu edad"
                type="number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu email"
                type="email" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="roleId"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Select
                placeholder="Selecciona un role"
              >
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