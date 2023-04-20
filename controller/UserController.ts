import { ResponseBean, RequestBean } from "../types";
import userDbServices from '../dbServices/UserServices'
import { ResponseParamBean } from '../config/PromptUtils';

export default class UserController {

    /**
     * @post 请求，添加用户信息
     * @param req
     * @param res
     */
    public async addUser(req: RequestBean, res: ResponseParamBean) {
        const response = await userDbServices.saveUser(req.body)
        res.success({id: response});
    }

    /**
     * @get请求，获取用户
     * @param req
     * @param res
     */
    public async getUser(req: RequestBean, res: ResponseParamBean)  {
        const id = req.param('id');
        if (!id) return Promise.reject('参数不存在');
        const response = await userDbServices.getUser(id);
        res.success(response)
    }

    /**
     * @post 请求。更新用户信息
     * @param req
     * @param res
     */
    public async updateUser(req: RequestBean, res: ResponseParamBean) {
        const id = req.param('id');
        if (!id) return Promise.reject('参数不存在');
        const response = await userDbServices.updateUser(id, req.body);
        res.success({id});
    }
}
