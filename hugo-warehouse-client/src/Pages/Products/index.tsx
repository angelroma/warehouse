import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm, Modal, Form, Input, Select, Spin, InputNumber } from 'antd';
import { add, getAll as getAllProducts, remove, update, getById, getAll } from '../../Entitites/Product/respository'
import { useForm } from 'antd/lib/form/Form';
import { getAll as getAllCategories } from '../../Entitites/Category/repository';
import { getAll as getAllProividers } from '../../Entitites/Provider/repository';
import moment from 'moment';
import { Category } from '../../Entitites/Category/interface';
import { Product } from '../../Entitites/Product/interface';
import { Provider } from '../../Entitites/Provider/interface';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Entitites/Auth/interface';
import { RootState } from '../../Store';

const { Column } = Table;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 }
}

const allowedRoles = ["admin", "developer"]

const MainEntity = () => {
  const [form] = useForm();
  const { user } = useSelector<RootState, AuthState>(state => state.auth_reducer);

  const [categories, setCategories] = useState<Category[]>();
  const [providers, setProviders] = useState<Provider[]>();
  const [product, setProduct] = useState<Product[]>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

  async function fetchAll() {
    try {
      await getAllProducts().then((users) => {
        console.log("Result => ", users);
        setProduct(users);
      });
    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'No se pueden adquirir los usuarios.',
      });
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function confirm(v: number) {

    try {
      await remove(v);
      await getAll().then((result) => setProduct(result));

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

  }

  async function handleOpenEmptyForm() {
    setIsModalOpen(true);
    setIsModalLoading(true);
    form.resetFields();

    getAllCategories().then((roles) => setCategories(roles));
    getAllProividers().then((providers) => setProviders(providers));

    setIsModalLoading(false);
  }

  async function handleOpenEditForm(id: number) {
    setIsModalOpen(true);
    setIsModalLoading(true);
    try {
      const entityToEdit = await getById(id);
      getAllCategories().then((roles) => setCategories(roles));
      getAllProividers().then((providers) => setProviders(providers));

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

      const entityForm = form.getFieldsValue() as Product;

      entityForm.createdOn = moment().toDate();
      entityForm.precision = entityForm.precision;
      entityForm.size = Number(entityForm.size);
      entityForm.weight = Number(entityForm.weight);

      if (entityForm.id === undefined) {
        await add(entityForm);
      }
      else await update(entityForm.id, entityForm);

      await fetchAll();

      setIsSavingForm(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

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

  if (product === undefined) return (<div>Cargando...</div>);
  if (user === null) return (<div>Cargando...</div>);

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
            dataSource={product}
            bordered size={"small"}
            className="mt-3"
            rowKey="id"
            scroll={{ x: "100vh" }}

          >
            {allowedRoles.includes(user.role) ?
              <Column<Product>
                title='#'
                render={(v) => (<div className="d-flex flex-row">
                  <Popconfirm
                    title="¿Está securo de eliminar este registro?"
                    onConfirm={() => confirm(v.id)}
                    okText="Si"
                    cancelText="No"
                  >
                    <Button type="link" className="p-0 m-1">Borrar</Button>
                  </Popconfirm>
                  <Button type="link" className="p-0 m-1" onClick={() => handleOpenEditForm(v.id)} >Editar</Button>
                </div>)}
              />
              : null}

            <Column<Product>
              title='ID'
              dataIndex='id'
            />
            <Column<Product>
              title='Nombre'
              dataIndex='name'
            />
            <Column<Product>
              title='Categoría'
              dataIndex={['category', 'name']}
              render={(value) => {
                return <div>{value === null ? "No Asignado" : value}</div>
              }}
            />
            <Column<Product>
              title='Precio'
              dataIndex='price'
            />
            <Column<Product>
              title='Descripción'
              dataIndex='description'
            />
            <Column<Product>
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
        style={{ top: "10px" }}
        okText={
          <div>{isSavingForm ? "Guardando..." : "Guardar"}</div>
        }
      >
        <Spin spinning={isModalLoading} tip={"Cargando..."} indicator={<div></div>} >


          <Form
            form={form}
            name="basic"
          >

            <Form.Item
              className="d-none"
              name="id"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 5, message: 'Se require como mínimo 5 caracteres.' },
                { pattern: /^[a-zA-Z0-9\s]*$/, message: 'Solo se permiten letras, números y espacios.' }
              ]}
              {...layout}
            >
              <Input placeholder={"Nombre"} />
            </Form.Item>

            <Form.Item
              label="Descripción"
              name="description"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 5, message: 'Se require como mínimo 5 caracteres.' },
                { pattern: /^[a-zA-Z0-9\s]*$/, message: 'Solo se permiten letras, números y espacios.' }
              ]}
              {...layout}
            >
              <Input placeholder={"Descripción"} />
            </Form.Item>

            <Form.Item
              label="precio"
              name="price"
              rules={[
                { required: true, message: 'Valor requerido' },
                { type: 'number', message: 'El precio debe de ser un número valido.' },
                {
                  validator(_rule, value) {
                    console.log(value)
                    if (value <= 50000) {
                      return Promise.resolve();
                    }
                    return Promise.reject('El precio máximo permitido es de 50 mil MXN');
                  },
                }]}
              {...layout}
            >
              <InputNumber
                placeholder="Precio"
                max={50000}
                width={300}
              />
            </Form.Item>

            <Form.Item
              label="Categoría"
              name="categoryId"
              rules={[{ required: true }]}
              {...layout}
            >
              <Select placeholder="Categoría">
                {categories?.map((value, index) =>
                  <Option key={index} value={value.id}>{value.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Proveedor"
              name="providerId"
              rules={[
                { required: true, message: 'Valor requerido.' },
              ]}
              {...layout}
            >
              <Select placeholder="Proveedor">
                {providers?.map((value, index) =>
                  <Option key={index} value={value.id}>{value.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 5, message: 'Se require como mínimo 5 caracteres.' },
                { max: 25, message: 'Se require como máximo 25 caracteres.' },
                { pattern: /^[a-z0-9]+$/i, message: 'Solo se permiten números y letras.' }
              ]}
              {...layout}
            >
              <Input placeholder="SKU" />
            </Form.Item>

            <Form.Item
              label="Color"
              name="color"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 4, message: 'Se require como mínimo 4 caracteres.' },
                { pattern: /^[a-zA-Z\s]*$/, message: 'Solo se permiten letras y espacios.' }
              ]}
              {...layout}
            >
              <Input placeholder="Color" />
            </Form.Item>

            <Form.Item
              label="Tamaño"
              name="size"
              rules={[
                { required: true, message: 'Valor requerido' },
                { type: 'number', message: 'El precio debe de ser un número valido.' },
                {
                  validator(_rule, value) {
                    console.log(value)
                    if (value <= 120) {
                      return Promise.resolve();
                    }
                    return Promise.reject('El tamño máximo permitido es de 120');
                  },
                }]}
              {...layout}
            >
              <InputNumber
                placeholder="Tamaño"
                max={50000}
                width={300}
              />
            </Form.Item>

            <Form.Item
              label="Peso"
              name="weight"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { type: 'number', message: 'Número no válido.' },
                {
                  validator(_rule, value) {
                    console.log(value)
                    if (value >= 1 && value <= 1500) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Rango de peso no permitido.');
                  },
                }]}
              {...layout}
            >
              <InputNumber
                placeholder="KG"
                width={300}
              />
            </Form.Item>

            <Form.Item
              label="Presición"
              name="precision"
              rules={[
                { required: true, message: 'Valor requerido.' },
                { min: 1, message: 'Se require como mínimo 1 caracteres.' },
                { pattern: /^[a-zA-Z0-9]*$/, message: 'Solo se permiten letras, números' }
              ]}
              {...layout}
            >
              <Input placeholder="Presición" />
            </Form.Item>

            <Form.Item
              label="marca"
              name="brand"
              rules={[
                { required: true, message: 'Valor requerido' },
                { pattern: /^[a-zA-Z\s]*$/, message: 'Solo se permiten letras y espacios.' }
              ]}
              {...layout}
            >
              <Input placeholder={"Marca"} />
            </Form.Item>
          </Form>

        </Spin>

      </Modal>


    </main>
  )
}
export default MainEntity;