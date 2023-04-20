import {BodyBean, ResponseBean} from "../types";

export class ResponseParamBean {
    private request: ResponseBean;

    constructor(req: ResponseBean) {
        this.request = req;
    }

    send(code: number, body: BodyBean, message?: string) {
        this.request.send({code: code, data: body, message: message});
    }

    success(body: BodyBean, message?: string) {
        this.send(200, body, message || "");
    }

    error(errMsg: string, code?: number) {
        this.send(code || 500, {}, errMsg);
    }
}
