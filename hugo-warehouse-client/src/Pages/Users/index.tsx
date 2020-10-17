import React, { useEffect, useState } from 'react'
import { Table, Button, Popconfirm, Modal, Form, Input, Select, Spin, InputNumber } from 'antd';
import { User } from '../../Entitites/User/interface';
import { add, getAll as getAllUsers, remove, update, getById, getAll } from '../../Entitites/User/repository'
import { useForm } from 'antd/lib/form/Form';
import { getAll as getAllRoles } from '../../Entitites/Role/repository';
import { Role } from '../../Entitites/Role/interface';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { AuthState } from '../../Entitites/Auth/interface';
import commonMessage from '../../CommonComponents/CommonMessage'
import { addErrorMessage, deleteErrorMessage, listErrorMessage, updateErrorMessage } from '../../Utils/custom.util';

const { Column } = Table;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 }
}

const MainEntity = () => {
  const { user } = useSelector<RootState, AuthState>(state => state.auth_reducer);

  const [form] = useForm();

  const [roles, setRoles] = useState<Role[]>();
  const [users, setUsers] = useState<User[]>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

  async function fetchAll() {
    try {
      await getAllUsers().then((users) => setUsers(users));
    } catch (error) {
      commonMessage(listErrorMessage)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function confirm(v: number) {

    try {

      if (user === null) throw new Error("Existe un error con tu cuenta, por favor contacta al administrador o intenta cerrar y iniciar sesión.");
      if (v === Number(user.id)) throw new Error("No puedes borrar tu propia cuenta.");

      await remove(v);
      await getAll().then((result) => setUsers(result));
      commonMessage('La entidad se borró con éxito')
    } catch (error) {
      console.error(error);
      commonMessage(deleteErrorMessage)
    }
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
      commonMessage(updateErrorMessage)
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
      commonMessage(addErrorMessage)
      setIsSavingForm(false);
    }
  }

  async function handleCancelForm() {
    setIsSavingForm(false);
    setIsModalOpen(false);
    form.resetFields();
  }

  if (users === undefined) return (<div>Cargando...</div>);

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
          <Table
            dataSource={users}
            bordered
            size={"small"}
            className="mt-3"
            rowKey="id"
            scroll={{ x: "100vh" }}
          >
            <Column<User>
              title='#'
              key='id'
              render={(v) => (<div className="d-flex flex-row">
                {v.id !== Number(user?.id) ? <Popconfirm
                  icon={null}
                  title="¿Está securo de eliminar este registro?"
                  onConfirm={() => confirm(v.id)}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="link" className={"p-0 m-1"}>Borrar</Button>
                </Popconfirm> : null}
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
        okText={
          <div>{isSavingForm ? "Guardando..." : "Guardar"}</div>
        }
      >
        <Spin spinning={isModalLoading} tip={"Cargando..."} indicator={<div></div>} >
          <Form
            form={form}
            name="basic"
            hideRequiredMark
          >
            <Form.Item
              className="d-none"
              name="id"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Usuario"
              name="userName"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 5, message: 'Se require como mínimo 5 caracteres.' },
                { max: 15, message: 'Se require como máximo 15 caracteres.' },
                { pattern: /^[a-z0-9]+$/i, message: 'Solo se permiten números y letras.' }
              ]}
              {...layout}
            >
              <Input
                placeholder="Escribe tu nombre de usuario"
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: 'Valor requerido' },
                { min: 5, message: 'Se require como mínimo 5 caracteres.' },
                { max: 150, message: 'Se require como máximo 150 caracteres.' },
              ]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu contraseña"
                type="password" />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: 'Valor requerido' },
                { min: 4, message: 'Se require como mínimo 4 caracteres.' },
                { max: 37, message: 'Se require como máximo 37 caracteres.' },
                { pattern: /^[a-zA-ZñÑ\u00E0-\u00FC\s]*$/, message: 'Solo se permiten letras y espacios.' }
              ]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu nombre completo"
              />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[
                { required: true, message: 'Valor requerido' },
                { type: 'number', message: 'La edad debe de ser un número.' },
                {
                  validator(_rule, value) {
                    console.log(value)
                    if (value >= 18 && value <= 85) {
                      return Promise.resolve();
                    }
                    return Promise.reject('La edad permitida es de 18 a 85 años');
                  },
                }]}
              {...layout}

            >
              <InputNumber
                placeholder="Edad"
                min={18}
                max={85}
                width={300}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Valor requerido' },
                { type: "email", message: 'Ingresa un email válido' }
              ]}
              {...layout}

            >
              <Input
                placeholder="Escribe tu email"
                type="email" />
            </Form.Item>

            <Form.Item
              label="Rol"
              name="roleId"
              rules={[{ required: true, message: 'Valor requerido' }]}
              {...layout}

            >
              <Select
                placeholder="Selecciona un rol"
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