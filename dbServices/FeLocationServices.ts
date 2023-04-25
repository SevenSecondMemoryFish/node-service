import dbConnection from "../dbMysql/DbConnextion";
import {response} from "express";

export interface FeLocationBean {
    id?: number,
    version: number,
    paths?: {[key:string]: string} | null,
    path?: string
    appBuildId: string,
    commitId: string
    status?: number
    createDate?: Date
}

export class FeLocationServices {
    /**
     * 保存一个
     * @param bean
     */
    saveLocation(bean: FeLocationBean) {
        const query = `INSERT INTO  db_felocation set ?`;
        bean.status = 0;
        bean.createDate = new Date();
        if (bean.paths) {
            bean.path = JSON.stringify(bean.paths);
            delete bean.paths;
        }
        return  dbConnection.queryPromise(query, bean).then(response => {
            return Promise.resolve(response);
        });
    }

    /**
     * 获取最后一条能用的配置信息
     */
    getLastConfig<T>(bean: any): Promise<T | null> {
        const query = `select version from db_felocation where ? order by id desc limit 1`;
        return dbConnection.queryPromise(query, bean).then(response => {
            if (response.length > 0) {
                return Promise.resolve(response[0] as T)
            }
            return Promise.resolve(null);
        })
    }

    /**
     * 根据version和appBuild获取config list
     * @param params
     */
    getConfigListByVersionAndBundleId<T>(params: any[]): Promise<T[]> {
        const query = `select * from db_felocation where app_build_id = ? and version > ? and status = 1`;
        return dbConnection.queryPromise(query, params)
    }
}

const feLocationServices = new FeLocationServices()
export default feLocationServices;
