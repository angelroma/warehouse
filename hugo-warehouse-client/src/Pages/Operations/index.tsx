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
    const [rangePicker, setRangePicker] = useState<ValueType>([moment().subtract(5, 'd').toDate(), moment().add(1, 'd').toDate()])

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
            console.error(error);
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

        const productTtypeName = products?.find(x => x.id === operationForm.productId)?.name

        operationForm.description = `El usuario ${user.unique_name} ejecutó la acción [${type}] ${operationForm.quantity} ${operationForm.quantity === 1 ? "producto" : "productos"} de tipo [${productTtypeName}] el ${moment().format('YYYY-MM-DD HH:MM')}`

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        firstFetchOperations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangePicker])

    if (products === undefined) return (<div>Cargando...</div>)

    return (
        <main>
            <section className="row mb-4">
                <div className="col-4">

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="id"
                            className="d-none"
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
                            rules={[
                                { required: true, message: 'Valor requerido' },
                                { type: 'number', message: 'Número inválido.' },
                                {
                                    validator(_rule, value) {
                                        console.log(value)
                                        if (value >= 1 && value <= 10) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Solo se permite de 1 a 10 productos por operación');
                                    },
                                }]}
                            initialValue={1}
                        >
                            <InputNumber min={1} max={10} />
                        </Form.Item>

                        <Form.Item shouldUpdate={true}>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"

                                >
                                    {saving ? "Guardando..." : "Guardar"}
                                </Button>
                            )}
                        </Form.Item>
                    </Form>

                </div>

                <div className="col-8">
                    <Card title="Operaciones recientes:"
                        extra={
                            <div className={"d-flex align-items-center"}>
                                <DateRangePicker
                                    showOneCalendar
                                    cleanable={false}
                                    placeholder="Rango de fecha"
                                    format="YYYY-MM-DD"
                                    placement="leftStart"
                                    value={rangePicker}
                                    ranges={[]}
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
                            showHeader={false}
                            loading={operations === undefined}
                            pagination={{ pageSize: 5, showSizeChanger: false }}
                            dataSource={operations}
                            size={"small"}
                            rowKey="id"

                        >
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