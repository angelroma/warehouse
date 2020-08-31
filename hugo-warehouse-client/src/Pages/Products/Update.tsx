import React, { useEffect, useState } from 'react'
import { Product } from '../../Interfaces/products.interface';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getById, update } from '../../Services/products.service';
import { getAll as getCategories } from '../../Services/categories.service'
import { getAll as getProviders } from '../../Services/providers.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Category } from '../../Interfaces/categories.interface';
import { Provider } from '../../Interfaces/providers.interface';

const { Option } = Select

const EntityUpdate = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [providers, setProviders] = useState<Provider[]>();

  const history = useHistory()

  const onFinish = (values: Store) => {

    const entity = {
      id: values.id,
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
      createdOn: values.createdOn,
    } as Product

    console.log('Success:', values);
    update(entity.id, entity)
      .then(() => {
        notification["success"]({
          message: '¡Actualización Exitosa!',
          description:
            'La actualización se ha realizado correctamente.',
        });
      })
      .catch(() => {
        notification["error"]({
          message: 'Error al actualizar',
          description:
            'No se puede actualizar esta entidad, contacte al administrador.',
        });
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    console.log("Running Effect");
    async function fetchData() {
      try {
        const categories = await getCategories();
        setCategories(categories);

        const providers = await getProviders();
        setProviders(providers);

        const p = await getById(id)
        setProduct(p);

      } catch (error) {
        notification["error"]({
          message: 'Error inesperado',
          description:
            'No se pueden obtener los atributos, contacte al administrador.',
        });
      }
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (product === undefined) return (<div>Cargando...</div>)

  return (

    <main>

      <Card type="inner" title={`Entidad ${product?.name}`}  extra={<Link to={"/productos"}>Regresar a lista de productos</Link>}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID"
            name="id"
            initialValue={product?.id}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="nombre"
            name="name"
            rules={[{ required: true }]}
            initialValue={product.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="descripción"
            name="description"
            rules={[{ required: true }]}
            initialValue={product.description}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="precio"
            name="price"
            rules={[{ required: true }]}
            initialValue={product.price}

          >
            <Input type='number' />
          </Form.Item>

          <Form.Item
            label="categoria"
            name="categoryId"
            rules={[{ required: true }]}
            initialValue={product.categoryId}

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
            initialValue={product.providerId}
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
            initialValue={product.sku}


          >
            <Input />
          </Form.Item>

          <Form.Item
            label="color"
            name="color"
            rules={[{ required: true }]}
            initialValue={product.color}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="tamaño"
            name="size"
            rules={[{ required: true }]}
            initialValue={product.size}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="peso"
            name="weight"
            rules={[{ required: true }]}
            initialValue={product.weight}

          >
            <Input />
          </Form.Item>

          <Form.Item
            label="presición"
            name="precision"
            rules={[{ required: true }]}
            initialValue={product.precision}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="marca"
            name="brand"
            rules={[{ required: true }]}
            initialValue={product.brand}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Fecha de registro"
            name="createdOn"
            initialValue={product?.createdOn}

          >
            <Input disabled />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Actualizar
        </Button>
          </Form.Item>
        </Form>

      </Card>


    </main>
  )
}

export default EntityUpdate;