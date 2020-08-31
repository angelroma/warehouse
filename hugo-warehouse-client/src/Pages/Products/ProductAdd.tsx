import React, { useEffect, useState } from 'react'
import { Product, } from '../../Interfaces/products.interface';
import { Link } from 'react-router-dom';
import { add } from '../../Services/products.service';
import { getAll as getCategories } from '../../Services/categories.service'
import { getAll as getProviders } from '../../Services/providers.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Category } from '../../Interfaces/categories.interface';
import { Provider } from '../../Interfaces/providers.interface';
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>();
  const [product, setProduct] = useState<Product>();
  const [providers, setProviders] = useState<Provider[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getCategories();
        setCategories(categories);

        const providers = await getProviders();
        setProviders(providers);

      } catch (error) {
        notification["error"]({
          message: 'Error inesperado',
          description:
            'No se pueden obtener los atributos, contacte al administrador.',
        });
      }
    }

    fetchData();
  }, [])

  const onFinish = (values: Store) => {

    const entity = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      providerId: values.providerId,
      brand: values.brand,
      color: values.color,
      precision: parseFloat(values.precision),
      price: parseFloat(values.price),
      size: parseFloat(values.size),
      sku: values.sku,
      weight: parseFloat(values.weight),
    } as Product

    console.log('Success:', values);
    add(entity)
      .then(() => {
        notification["success"]({
          message: '¡Perfecto!',
          description:
            'Se ha agregado una nueva entidad',
        });
        form.resetFields();
      })
      .catch(e => {
        notification["error"]({
          message: 'Error al agregar',
          description:
            'No se puede agregar esta entidad, contacte al administrador',
        });
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <main>

      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <Card
            type="inner"
            title={`Agregar Producto`}
            extra={<Link to={"/productos"}>Regresar a lista de productos</Link>}
          >

            <Form
              form={form}
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="nombre"
                name="name"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="descripción"
                name="description"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="precio"
                name="price"
                rules={[{ required: true }]}

              >
                <Input type='number' />
              </Form.Item>

              <Form.Item
                label="categoria"
                name="categoryId"
                rules={[{ required: true }]}

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

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="color"
                name="color"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="tamaño"
                name="size"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="peso"
                name="weight"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item
                label="presición"
                name="precision"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="marca"
                name="brand"
                rules={[{ required: true }]}

              >
                <Input />
              </Form.Item>

              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Agregar producto
        </Button>
              </Form.Item>
            </Form>

          </Card>

        </div>
      </div>


    </main>
  )
}

export default ProductAdd;