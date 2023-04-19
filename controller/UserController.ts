import { ResponseBean, RequestBean } from "../types";
import userDbServices from '../dbServices/UserServices'

export default class UserController {
    
    /**
     * @post 请求，添加用户信息
     * @param req
     * @param res
     */
    public async addUser(req: RequestBean, res: ResponseBean) {
        const response = await userDbServices.saveUser(req.body)
        res.send({id: response});
    }

    /**
     * @get请求，获取用户
     * @param req
     * @param res
     */
    public async getUser(req: RequestBean, res: ResponseBean) {
        const id = req.param('id');
        if (!id) return Promise.reject('参数不存在');
        const response = await userDbServices.getUser(id);
        res.send(response)
    }
}
