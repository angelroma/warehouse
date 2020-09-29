import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm, Modal, Form, Input, Select, Spin } from 'antd';
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
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

  async function fetchAll() {
    try {
      await getAllProducts().then((users) => setProduct(users));
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

    setLoading(false)
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
      entityForm.precision = Number(entityForm.precision);
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

  if (user === null) return (<div>Cargando...</div>)

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
          <Table dataSource={product} bordered size={"small"} loading={loading} className="mt-3" rowKey="id">
            {allowedRoles.includes(user.role) ?
              <Column<Product>
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
              : null}
              
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
              label="nombre"
              name="name"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="descripción"
              name="description"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="precio"
              name="price"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item
              label="categoria"
              name="categoryId"
              rules={[{ required: true }]}
              {...layout}
            >
              <Select >
                {categories?.map((value, index) =>
                  <Option key={index} value={value.id}>{value.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="proveedor"
              name="providerId"
              rules={[{ required: true }]}
              {...layout}
            >
              <Select >
                {providers?.map((value, index) =>
                  <Option key={index} value={value.id}>{value.name}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="sku"
              name="sku"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="color"
              name="color"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="tamaño"
              name="size"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="peso"
              name="weight"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="presición"
              name="precision"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="marca"
              name="brand"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input />
            </Form.Item>
          </Form>

        </Spin>

      </Modal>


    </main>
  )
}
export default MainEntity;