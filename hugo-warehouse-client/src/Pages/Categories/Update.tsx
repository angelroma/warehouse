import React, { useEffect, useState } from 'react'
import { Category } from '../../Interfaces/categories.interface';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getById, update } from '../../Services/categories.service';
import { Form, Input, Button, Card, notification } from 'antd';
import { Store } from 'antd/lib/form/interface';

const CategoryUpdate = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const history = useHistory()

  const onFinish = (values: Store) => {
    const category: Category = { id: values.id, name: values.name, description: values.description, createdOn: values.createdOn }
    console.log('Success:', values);
    update(category.id, category)
      .then(() => {
        notification["success"]({
          message: '¡Actualización Exitosa!',
          description:
            'La actualización se ha realizado correctamente.',
        });      })
      .catch(e => {
        notification["error"]({
          message: 'Error al actualizar',
          description:
            'No se puede actualizar esta categoría, contacte al administrador.',
        });
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getById(id)
      .then(result => {
        setCategory(result)
      })
      .catch(e => {

      })
  }, [id])

  console.log(id)

  if (category === null) return <div>Cargando...</div>

  return (

    <main>

      <Card type="inner" title={`Categoria ${category.name}`}  extra={<Link to={"/categorias"}>Regresar a lista de categorías</Link>}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID"
            name="id"

            initialValue={category.id}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            initialValue={category.name}
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={category.description}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de registro"
            name="createdOn"
            initialValue={category.createdOn}

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

export default CategoryUpdate;