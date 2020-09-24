import React, { useEffect, useState } from 'react'
import { User } from '../../Interfaces/users.interface';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getById, update } from '../../Services/users.service';
import { getAll as getUsers } from '../../Services/roles.service'
import { Form, Input, Button, Card, notification, Select } from 'antd';
import { Role } from '../../Interfaces/roles.interface';

const { Option } = Select

const EntityUpdate = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [roles, setRoles] = useState<Role[]>();
  const history = useHistory()

  const onFinish = (values: any) => {
    const entity = values as User;
    console.log('Success:', values);
    update(entity.id, entity)
      .then(() => {
        notification["success"]({
          message: '¡Actualización Exitosa!',
          description:
            'La actualización se ha realizado correctamente.',
        });
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
        console.log(result);

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

  if (user === undefined) return <div>Cargando...</div>

  return (

    <main>

      <Card type="inner" title={`Entidad ${user.name}`}  extra={<Link to={"/usuarios"}>Regresar a lista de usuarios</Link>}>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ID"
            name="id"
            initialValue={user.id}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Usuario"
            name="userName"
            rules={[{ required: true, message: 'Valor requerido' }]}
            initialValue={user.userName}
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
            <Input type="number" />
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
                <Option key={x.id} value={x.id}>{x.name}</Option>
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