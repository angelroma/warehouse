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
        fetchAll()
    }, [])

    async function confirm(v: number) {

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

    if (categories === undefined) return (<div>Cargando...</div>);

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
                    <Table
                        dataSource={categories}
                        bordered
                        size={"small"}
                        className="mt-3"
                        rowKey="id"
                        scroll={{ x: "100vh" }}
                    >
                        <Column<Provider>
                            title='#'
                            key='id'
                            render={(v) => (<div className="d-flex flex-row">
                                <Popconfirm
                                    title="¿Está securo de eliminar este registro?"
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
                okText={
                    <div>{isSavingForm ? "Guardando..." : "Guardar"}</div>
                }
            >
                <Spin spinning={isModalLoading} tip={"Cargando..."} indicator={<div></div>} >
                    <Form
                        form={form}
                        name="basic"
                    >

                        <Form.Item
                            className="d-none"
                            name="id"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Nombre"
                            name="name"
                            rules={[
                                { required: true, message: 'Valor requerido.' },
                                { pattern: /^[a-zA-Z\s]*$/, message: 'Solo se permiten letras y espacios.' }
                            ]}
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