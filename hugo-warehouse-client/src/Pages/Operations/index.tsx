import { Button, Card, Form, Input, InputNumber, notification, Select, Statistic, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../Entitites/Auth/interface";
import { Operation } from "../../Entitites/Operation/interface";
import { OperationType } from "../../Entitites/OperationType/interface";
import { RootState } from "../../Store";
import { getAllByDateRange, add } from "../../Entitites/Operation/repository";
import { getAll as getAllOperationTypes } from "../../Entitites/OperationType/repository";
import { getAll as getAllProducts } from "../../Entitites/Product/respository";
import { Product } from "../../Entitites/Product/interface";
import Column from "antd/lib/table/Column";
import moment from "moment";
import 'moment/locale/es-mx';
import { DateRangePicker } from "rsuite";
import { ValueType } from "rsuite/lib/DateRangePicker";
import { CSVLink } from "react-csv";
import { Data } from "react-csv/components/CommonPropTypes";

const { Option } = Select;

const Entry = () => {
    const { user } = useSelector<RootState, AuthState>(state => state.auth_reducer);
    const [operations, setOperations] = useState<Operation[]>();
    const [operationTypes, setOperationTypes] = useState<OperationType[]>();
    const [products, setProducts] = useState<Product[]>();
    const [, forceUpdate] = useState<any>();
    const [form] = useForm();
    const [saving, setSaving] = useState<boolean>(false);
    const [rangePicker, setRangePicker] = useState<ValueType>([moment().subtract(5, 'd').toDate(), moment().toDate()])

    async function firstFetchOperations() {
        const dateRanges = {
            startDate: rangePicker[0],
            endDate: rangePicker[1]
        }

        await getAllByDateRange(dateRanges).then((operations) => setOperations(operations));
    }

    async function fetchAll() {
        try {
            await firstFetchOperations()
            await getAllOperationTypes().then((result) => setOperationTypes(result));
            await getAllProducts().then((result) => setProducts(result));
        } catch (error) {
            notification["error"]({
                message: "Error",
                description:
                    'No se pueden adquirir las operaciones.',
            });
        }
    }

    async function onFinish(value: any) {
        setSaving(true);
        const operationForm = value as Operation

        operationForm.createdOn = moment().toDate();

        if (user === null) throw new Error("Usuario no encontrado. Contacte al administrador.");
        operationForm.userId = Number(user.id);

        let type = operationTypes?.find(x => x.id === operationForm.operationTypeId)?.name

        if (type === 'agregar') type = "agregó";
        if (type?.trim() === 'aliminar') type = "eliminó";

        const productTtypeName = products?.find(x => x.id === operationForm.productId)?.name

        operationForm.description = `El usuario ${user.unique_name} ${type} ${operationForm.quantity} ${operationForm.quantity === 1 ? "producto" : "productos"} de tipo [${productTtypeName}] el ${moment().format('YYYY-MM-DD HH:MM')}`

        await add(operationForm);
        await fetchAll();
        setSaving(false);
    }

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    useEffect(() => {
        fetchAll();
    }, []);


    useEffect(() => {
        firstFetchOperations();
    }, [rangePicker])

    if (products === undefined) return (<div>Cargando...</div>)

    return (
        <main>
            <section className="row mb-4">
                <div className="col-4">

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="id"
                            hidden
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Tipo de operación:"}
                            name="operationTypeId"
                            rules={[{ required: true, message: 'Valor requerido.' }]}
                        >
                            <Select
                                placeholder={"Operación..."}
                            >
                                {operationTypes?.map((value, index) =>
                                    <Option key={index} value={value.id}>{value.name}</Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={"Tipo de Producto:"}
                            name="productId"
                            rules={[{ required: true, message: 'Valor requerido.' }]}
                        >
                            <Select
                                placeholder={"Producto..."}
                            >
                                {products?.map((value, index) =>
                                    <Option key={index} value={value.id}>{value.name}</Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={"Cantidad:"}
                            name="quantity"
                            rules={[{ required: true, message: 'Valor requerido.' }]}
                            initialValue={1}
                        >
                            <InputNumber min={1} />
                        </Form.Item>

                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={saving}
                                >
                                    Guardar
                                </Button>
                            )}
                        </Form.Item>
                    </Form>

                </div>

                <div className="col-8">
                    <Card type="inner" title="Operaciones recientes:"
                        extra={
                            <div className={"d-flex align-items-center"}>
                                <DateRangePicker
                                    cleanable={false}
                                    placeholder="Rango de fecha"
                                    format="YYYY-MM-DD"
                                    placement="leftStart"
                                    value={rangePicker}
                                    onChange={(v) => setRangePicker(v)}
                                    locale={{
                                        sunday: 'D',
                                        monday: 'L',
                                        tuesday: 'M',
                                        wednesday: 'MI',
                                        thursday: 'J',
                                        friday: 'V',
                                        saturday: 'S',
                                        ok: 'OK',
                                        today: 'Hoy',
                                        yesterday: 'Ayer',
                                        last7Days: 'Últimos 7 días'
                                    }}
                                />

                                <Button className="ml-3">
                                    <CSVLink
                                        filename={`reporte_${Date.now()}.csv`}
                                        data={operations as Data}
                                        headers={
                                            [
                                                { label: "Producto id", key: "productId" },
                                                { label: "Proceso", key: "description" },
                                                { label: "Cantidad Absoluta", key: "queantity" },
                                                { label: "Fecha", key: "createdOn" }
                                            ]
                                        }>Generar Reporte</CSVLink>
                                </Button>
                            </div>}
                    >
                        <Table
                            loading={operations === undefined}
                            pagination={{ pageSize: 5, showSizeChanger: false }}
                            dataSource={operations} size={"small"} rowKey="id">
                            <Column<Operation>
                                dataIndex='description'
                                key='description'
                            />
                        </Table>
                    </Card>
                </div>
            </section>

            <section className="row">

                {products?.map((item, index) => {
                    return <div key={index} className="col-2">
                        <Card>
                            <Statistic title={item.name} value={item.currentTotal} />
                        </Card>
                    </div>
                })}

            </section>
        </main >
    )
}

export default Entry;