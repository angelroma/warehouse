import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
import {  add } from '../../Services/categories.service';
import { Form, Input, Button, Card, notification } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Category } from '../../Interfaces/categories.interface';



const CategoriesUpdatePage = () => {
  const onFinish = (values: Store) => {
    const category: Category = { id: values.id, name: values.name, description: values.description, createdOn: values.createdOn }
    console.log('Success:', values);
    add(category)
      .then(() => {
        notification["success"]({
          message: '¡Perfecto!',
          description:
            'Se ha agregado una nueva entidad',
        });
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

  useEffect(() => {

  }, [])

  return (

    <main>

      <Card type="inner" title={`Agregar entidad`} extra={<Link to={"/categorias"}>Regresar a lista de categorías</Link>}>

        <Form
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

          <Form.Item >
            <Button type="primary" htmlType="submit">
              Agregar
        </Button>
          </Form.Item>
        </Form>

      </Card>


    </main>
  )
}

export default CategoriesUpdatePage;