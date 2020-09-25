import React, { useEffect, useState } from 'react'
import { Table, notification, Button, Popconfirm, Modal, Form, Input, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { Provider } from '../../Entitites/Provider/interface';
import { add, getAll, remove, update, getById } from '../../Entitites/Provider/repository'

const { Column } = Table;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 }
}

const MainEntity = () => {
    const [form] = useForm();

    const [categories, setCategories] = useState<Provider[]>();
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
    const [isSavingForm, setIsSavingForm] = useState<boolean>(false);

    async function fetchAll() {
        try {
            await getAll().then((categories) => setCategories(categories));
        } catch (error) {
            notification["error"]({
                message: "Error",
                description:
                    'No se pueden adquirir las categorias.',
            });
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchAll().then(() => setLoading(false))
    }, [])

    async function confirm(v: number) {
        setLoading(true);

        try {
            await remove(v);
            await getAll().then((result) => setCategories(result));

            notification["success"]({
                message: '¡Perfecto!',
                description:
                    'La entidad se borró con éxito',
            });
        } catch (error) {
            notification["error"]({
                message: "Error",
                description:
                    'La entidad no se puede borrar, contacte al administrador.',
            });
        }

        setLoading(false)
    }

    async function handleOpenEmptyForm() {
        setIsModalOpen(true);
        setIsModalLoading(true);
        form.resetFields();

        getAll().then((categories) => setCategories(categories));

        setIsModalLoading(false);
    }

    async function handleOpenEditForm(id: number) {
        setIsModalOpen(true);
        setIsModalLoading(true);
        try {
            const entityToEdit = await getById(id);
            getAll().then((categories) => setCategories(categories));

            form.setFieldsValue(entityToEdit);
            setIsModalLoading(false);

        } catch (error) {
            notification["error"]({
                message: "Error",
                description:
                    'Hay un error al actualizar o al actualizar.',
            });
            setIsModalLoading(false);
        }
    }

    async function handleSaveForm() {
        await form.validateFields();

        try {
            setIsSavingForm(true)

            const entityForm = form.getFieldsValue() as Provider;

            entityForm.createdOn = moment().toDate();

            if (entityForm.id === undefined) {
                await add(entityForm);
            }
            else await update(entityForm.id, entityForm);

            await fetchAll();

            setIsSavingForm(false);
            setIsModalOpen(false);
        } catch (error) {
            notification["error"]({
                message: "Error",
                description:
                    'Hay un error al actualizar o al actualizar.',
            });
            setIsSavingForm(false);
        }
    }

    async function handleCancelForm() {
        setIsSavingForm(false);
        setIsModalOpen(false);
        form.resetFields();
    }

    return (
        <main>
            <div className="row justify-content-end">

                <div className="col-auto">
                    <Button onClick={() => handleOpenEmptyForm()}>
                        Agregar nueva entidad
          </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Table dataSource={categories} bordered size={"small"} loading={loading} className="mt-3" rowKey="id">
                        <Column<Provider>
                            title='#'
                            key='id'
                            render={(v) => (<div className="d-flex flex-row">
                                <Popconfirm
                                    title="La entidad solo se podrá borrar si no tiene dependientes."
                                    onConfirm={() => confirm(v.id)}
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <Button type="link" className="p-0 m-1">Borrar</Button>

                                </Popconfirm>
                                <Button type="link" className="p-0 m-1" onClick={() => handleOpenEditForm(v.id)} >Editar</Button>
                            </div>)}
                        />
                        <Column<Provider>
                            title='Nombre'
                            dataIndex='name'
                            key='name'
                        />
                        <Column<Provider>
                            title='Fecha de Registro'
                            dataIndex='createdOn'
                            key='createdOn'
                        />

                    </Table>
                </div>
            </div>

            <Modal
                title={"Formulario"}
                visible={isModalOpen}
                onOk={() => handleSaveForm()}
                onCancel={() => handleCancelForm()}
                confirmLoading={isSavingForm}
            >
                <Spin spinning={isModalLoading} tip={"Cargando..."}>

                    <Form
                        form={form}
                        name="basic"
                    >

                        <Form.Item
                            hidden
                            name="id"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="nombre"
                            name="name"
                            rules={[{ required: true }]}
                            {...layout}
                        >
                            <Input />
                        </Form.Item>

                    </Form>

                </Spin>

            </Modal>


        </main>
    )
}
export default MainEntity;