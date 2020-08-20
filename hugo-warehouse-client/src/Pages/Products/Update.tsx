import React, { useEffect, useState } from 'react'
import { Product, ProductAttribute, CustomParams } from '../../Interfaces/products.interface';
import { useParams, useHistory } from 'react-router-dom';
import { getById, update } from '../../Services/products.service';
import { getAll as getCategories } from '../../Services/categories.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Category } from '../../Interfaces/categories.interface';

const { Option } = Select

const EntityUpdate = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[] | null>();
  const history = useHistory()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [customParams, setCustomParams] = useState<CustomParams[]>([]);

  const onFinish = (values: Store) => {
    const productAttributes = customParams.map(x => ({ attributeId: x.key, productId: 0, value: x.value} as ProductAttribute));

    const entity: Product = {
      key: values.key,
      name: values.name,
      description: values.description,
      createdOn: values.createdOn,
      price: values.price,
      categoryId: values.categoryId,
      categoryName: values.categoryName,
      productAttributes: productAttributes
    }

    console.log('Success:', values);
    update(entity.key, entity)
      .then(() => {
        history.push('/productos')
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

    getById(id)
      .then(result => {
        setProduct(result)
      })
      .then(() => {
        getCategories().then(result => setCategories(result))
      })

      .catch(e => {
        console.error(e)
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (product === null) return <div>Cargando...</div>

  return (

    <main>

      <Card type="inner" title={`Entidad ${product.name}`}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID"
            name="key"

            initialValue={product.key}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            initialValue={product.name}
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={product.description}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Precio"
            name="price"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={product.price}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Categoria"
            name="categoryId"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={product.categoryId}
          >
            <Select defaultValue={product.categoryName} >
              {categories?.map(x =>
                <Option key={x.key} value={x.key}>{x.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha de registro"
            name="createdOn"
            initialValue={product.createdOn}

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