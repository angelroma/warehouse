import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Store } from 'antd/lib/form/interface';
import './LoginPage.scss'
import { AuthLoginRequest } from '../../Entitites/Auth/interface';
import { login } from '../../Entitites/Auth/repository';

const Login = () => {
  const [isLogginIn, setIsLogginIn] = useState(false);

  const onFinish = async (values: Store) => {
    setIsLogginIn(true);
    let request: AuthLoginRequest = { username: values.username, password: values.password }
    await login(request)
      .catch(e => {
        console.log(e.message)
        setIsLogginIn(false);
        notification["error"]({
          message: 'Error',
          description: "No se puede ingresar con estas credenciales, contacte al administrador",
        });
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="LoginPage">
      <div className="form">
        <div className="text-center">
          <h1 className="form-title">Bienvenido</h1>
          <h4 className="form-subtitle">Ingresa tus credenciales</h4>
        </div>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item

            name="username"
            rules={[{ required: true, message: 'Ingresa tu nombre de usuario.' }]}
          >
            <Input placeholder="Usuario:" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Ingresa tu contraseña.' }]}
          >
            <Input.Password placeholder="Contraseña:" />
          </Form.Item>
          <br />
          <Form.Item >
            <Button loading={isLogginIn} type="primary" htmlType="submit" block>Entrar</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login