import React, { useEffect, useState } from 'react'
import { Statistic, Card, Calendar, notification } from 'antd';
import { DotChartOutlined, UsergroupAddOutlined, BorderBottomOutlined } from "@ant-design/icons";
import moment from 'moment'
import "./Dashboard.Style.scss"
import { Product } from '../../Entitites/Product/interface';
import { Category } from '../../Entitites/Category/interface';
import { User } from '../../Entitites/User/interface';
import { Provider } from '../../Entitites/Provider/interface';
import { getAll as getAllProducts } from '../../Entitites/Product/respository';
import { getAll as getAllCategories } from '../../Entitites/Category/repository';
import { getAll as getAllUsers } from '../../Entitites/User/repository';
import { getAll as getAllProviders } from '../../Entitites/Provider/repository';

moment.updateLocale('en', {
  weekdaysMin: ["D", "L", "M", "MI", "J", "V", "S"],
});

const Dashboard = () => {

  const [products, setProducts] = useState<Product[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [users, setUsers] = useState<User[]>()
  const [providers, setProviders] = useState<Provider[]>()


  async function fetchAll() {
    try {
      await getAllProducts().then((result) => setProducts(result));
      await getAllCategories().then((result) => setCategories(result));
      await getAllUsers().then((result) => setUsers(result));
      await getAllProviders().then((result) => setProviders(result));
    } catch (error) {
      notification["error"]({
        message: "Error",
        description:
          'No se pueden adquirir las entidades.',
      });
    }
  }

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <main className=" mb-5">
      <section className="row">
        <div className="col-12">
          <Card type="inner" title="Calendario" >
            <Calendar fullscreen={false} className="calendar-dashboard" onSelect={() => { return }} />
          </Card>
        </div>
      </section>

      <section className="row mt-3">

        <div className="col-6">
          <Card title="Productos Disponibles" bordered={false} loading={products === undefined}>
            <Statistic title="Total" value={products?.length} prefix={<DotChartOutlined />} />
          </Card>
        </div>

        <div className="col-6">
          <Card title="Usuarios Disponibles" bordered={false} loading={users === undefined}>
            <Statistic title="Total" value={users?.length} prefix={<UsergroupAddOutlined />} />
          </Card>
        </div>
      </section>

      <section className="row mt-4">
        <div className="col-6">
          <Card title="Categorías Disponibles" bordered={false} loading={categories === undefined}>
            <Statistic title="Total" value={categories?.length} prefix={<BorderBottomOutlined />} />
          </Card>
        </div>

        <div className="col-6">
          <Card title="Proveedores Disponibles" bordered={false} loading={providers === undefined}>
            <Statistic title="Total" value={providers?.length} prefix={<BorderBottomOutlined />} />
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Dashboard;