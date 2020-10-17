import { message } from "antd";

const commonMessage = (msj: string) => {
    message.info({
       
        content: msj
    });
};

export default commonMessage;