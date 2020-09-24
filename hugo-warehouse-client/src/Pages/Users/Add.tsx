import React, { useEffect, useState } from 'react'
import { User } from '../../Interfaces/users.interface';
import { Link } from 'react-router-dom';
import { add } from '../../Services/users.service';
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Role } from '../../Interfaces/roles.interface';
import { getAll as getRoles } from '../../Services/roles.service'

const { Option } = Select

const EntityAdd = () => {
  const [roles, setRoles] = useState<Role[] | null>();

  const onFinish = (values: Store) => {
    const entity = values as User

    entity.roleId = parseFloat(entity.roleId.toString());
    entity.age = Number(entity.age.toString());

    console.log('Success:', values);
    add(entity)
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
    getRoles().then(result => setRoles(result))
  }, [])

  return (

    <main>

      <Card type="inner" title={`Agregar entidad`} extra={<Link to={"/usuarios"}>Regresar a lista de usuarios</Link>}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >


          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="roleId"
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Select >
              {roles?.map(x =>
                <Option key={x.id} value={x.id}>{x.name}</Option>
              )}
            </Select>
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

export default EntityAdd;