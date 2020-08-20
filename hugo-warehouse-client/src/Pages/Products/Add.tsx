import React, { useEffect, useState } from 'react'
import { Product, ProductAttribute, CustomParams } from '../../Interfaces/products.interface';
import { Link } from 'react-router-dom';
import { add } from '../../Services/products.service';
import { getAll as getAllAttributes } from '../../Services/attributes.service';
import { getAll as getCategories } from '../../Services/categories.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Attribute } from '../../Interfaces/attributes.interface';
import { Category } from '../../Interfaces/categories.interface';
const { Option } = Select;


const ProductAdd = () => {
  const [customParams, setCustomParams] = useState<CustomParams[]>([]);
  const [form] = Form.useForm();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [categories, setCategories] = useState<Category[] | null>();


  useEffect(() => {
    getAllAttributes()
      .then(result => {
        setAttributes(result)
      })
      .then(() => {
        getCategories()
          .then(result => setCategories(result))
      })
      .catch(() => {
        notification["error"]({
          message: 'Error inesperado',
          description:
            'No se pueden obtener los atributos, contacte al administrador.',
        });
      })
  }, [])

  const onFinish = (values: Store) => {
    const productAttributes = customParams.map(x => ({ attributeId: x.key, productId: 0, value: x.value } as ProductAttribute));

    const entity: Product = {
      key: values.key, name: values.name,
      description: values.description,
      createdOn: values.createdOn,
      price: values.price,
      categoryId: values.categoryId,
      categoryName: values.categoryName,
      productAttributes: productAttributes,
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

  if (attributes === undefined) return <div>Cargando...</div>

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
              {categories?.map(x =>
                <Option key={x.key} value={x.key}>{x.name}</Option>
              )}
            </Select>
          </Form.Item>


          {customParams.map((x, index) =>
            <Form.Item
              key={index}
              label={x.name}
              name={x.name}
            >
              <div className="row">
                <div className="col-10">
                  <Input disabled value={x.value} />
                </div>
                <div className="col-2">
                  <Button onClick={() => {
                    console.log(index, x);

                    const newParams = customParams.slice()
                    newParams.splice(index, index + 1);
                    setCustomParams(newParams)
                  }}>Eliminar</Button>
                </div>
              </div>

            </Form.Item>
          )}

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Agregar producto
        </Button>
          </Form.Item>
        </Form>

      </Card>


      {/* <Card
        className={"mt-5 mb-5"}
        type="inner"
        title={`Agregar nuevo parametro`}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handleAddParameter}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Atributos"
            name="attribute"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Atributos disponibles"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {attributes.map((x, index) =>
                <Option key={index} value={JSON.stringify(x)}>{x.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Valor"
            name="value"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Agregar nueva propiedad
        </Button>
          </Form.Item>
        </Form>
      </Card> */}

    </main>
  )
}

export default ProductAdd;