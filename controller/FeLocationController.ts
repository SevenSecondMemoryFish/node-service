import {ResponseParamBean} from '../config/PromptUtils';
import {RequestBean} from "../types";
import feLocationServices from "../dbServices/FeLocationServices";
import {FeLocationBean} from '../dbServices/FeLocationServices';

export default class FeLocationController {

    /**
     * @pai post 保存一个配置文件
     * @param req
     * @param response
     */
    async saveFeLocation(req: RequestBean, response: ResponseParamBean) {
        const body = req.body as FeLocationBean;
        const config = await feLocationServices.getLastConfig<FeLocationBean>({appBuildId: body.appBuildId});
        let version = null;
        if (config && config.version) {
            version = config.version;
        }
        if (version && body.version <= version) {
            return response.error('版本太低了');
        }
        const result = await feLocationServices.saveLocation(body);
        return response.success({id: result['insertId']});
    }

    /**
     * @api get 获取一个可以使用的配置
     * @param req
     * @param response
     */
    async getActiveFeLocation(req: RequestBean, response: ResponseParamBean) {
        const version  = req.param('version', -1);
        const appBuildId = req.param('appBuildId')
        const list = await feLocationServices.getConfigListByVersionAndBundleId<FeLocationBean>([appBuildId, version]);
        if (list.length <= 0) {
            return response.success({});
        }
        const config = {} as any;
        list.forEach(item => {
            try {
                const _paths = JSON.parse(item.path || '{}');
                Object.keys(_paths).forEach(key => {
                    config[key] = _paths[key];
                })
            } catch (e) {

            }
        });
        const result = list[list.length - 1];
        result.paths = config;
        delete result.path;
        return response.success(result)
    }
}
