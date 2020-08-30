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

    const entity: any = {
      name: values.name,
      description: values.description,
      createdOn: values.createdOn,
      categoryId: values.categoryId,
    }

    console.log('Success:', values);
    add(entity)
      .then(() => {
        notification["success"]({
          message: '¡Perfecto!',
          description:
            'Se ha agregado una nueva entidad',
        });
        form.resetFields();
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

      <Card
        type="inner"
        title={`Agregar Producto`}
        extra={<Link to={"/productos"}>Regresar a lista de productos</Link>}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Precio"
            name="price"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item
            label="Categoria"
            name="categoryId"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Select >
              {categories?.map((value,index) =>
                <Option key={index} value={value.id}>{value.name}</Option>
              )}
            </Select>
          </Form.Item>


          <Form.Item >
            <Button type="primary" htmlType="submit">
              Agregar producto
        </Button>
          </Form.Item>
        </Form>

      </Card>

    </main>
  )
}

export default ProductAdd;