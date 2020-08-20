import React, { useEffect, useState } from 'react'
import { User } from '../../Interfaces/users.interface';
import { useParams, useHistory } from 'react-router-dom';
import { getById, update } from '../../Services/users.service';
import { getAll as getUsers } from '../../Services/roles.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Role } from '../../Interfaces/roles.interface';

const { Option } = Select

const EntityUpdate = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[] | null>();
  const history = useHistory()

  const onFinish = (values: any) => {
    const entity = values as User;
    console.log('Success:', values);
    update(entity.key, entity)
      .then(() => {
        history.push('/usuarios')
      })
      .catch((e) => {
        console.error(e)
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
        setUser(result)
      })
      .then(() => {
        getUsers().then(result => setRoles(result))
      })

      .catch(e => {
        console.error(e)
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user === null) return <div>Cargando...</div>

  return (

    <main>

      <Card type="inner" title={`Entidad ${user.name}`}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID"
            name="key"

            initialValue={user.key}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.username}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.password}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="name"
            initialValue={user.name}
            rules={[{ required: true, message: 'Valor requerido' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.age}
          >
            <Input type="number"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.email}
          >
            <Input type="email" />
          </Form.Item>
     
          <Form.Item
            label="Role"
            name="roleId"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.roleId}
          >
            <Select >
              {roles?.map(x =>
                <Option key={x.key} value={x.key}>{x.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha de registro"
            name="createdOn"
            initialValue={user.createdOn}

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