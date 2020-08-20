import React from 'react'
import { Statistic, Card, Calendar } from 'antd';
import { DotChartOutlined, UsergroupAddOutlined, BorderBottomOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import moment from 'moment'
import "./Dashboard.Style.scss"

moment.updateLocale('en', {
  weekdaysMin: ["D", "L", "M", "MI", "J", "V", "S"],
});

const Dashboard = () => {

  return (
    <main>
      <section className="row">
        <div className="col-12">
          <Card type="inner" title="Pantalla De Inicio" extra={<Link to={"/"}>Tabla de registros</Link>}>
            <Calendar fullscreen={false} className="calendar-dashboard" onSelect={() => { return }} />
          </Card>
        </div>
      </section>


      <section className="row mt-3">

        <div className="col-6">
          <Card title="Productos Disponibles" bordered={false}>
            <Statistic title="Número disponible" value={1128} prefix={<DotChartOutlined />} />
          </Card>
        </div>

        <div className="col-6">
          <Card title="Usuarios Disponibles" bordered={false}>
            <Statistic title="Número disponible" value={1128} prefix={<UsergroupAddOutlined />} />
          </Card>
        </div>
      </section>

      <section className="row mt-4">
        <div className="col-6">
          <Card title="Categorías Disponibles" bordered={false}>
            <Statistic title="Número disponible" value={1128} prefix={<BorderBottomOutlined />} />
          </Card>
        </div>

        <div className="col-6">
          <Card title="Parametros Disponibles" bordered={false}>
            <Statistic title="Número disponible" value={1128} prefix={<BorderBottomOutlined />} />
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Dashboard;