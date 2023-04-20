import dbConnection from "../dbMysql/DbConnextion";
interface UserBean {
    id?: number
    username?: string
    phone?: string,
    password?: string,
    usericon?: string,
    address?: string
}

class UserDbServices {

    public getUser(id: number): Promise<UserBean> {
        const query = `select * from db_user where id = ${id}`
        return dbConnection.queryPromise(query).then((result) => {
            if (result.length <= 0) return Promise.reject('没有此用户');
            return Promise.resolve(result[0])
        })
    }

    public saveUser(user: UserBean) {
        const query = 'INSERT INTO db_user set ?'
        return dbConnection.queryPromise(query, user).then((result) => {
            return Promise.resolve(result['insertId'])
        })
    }

    public updateUser(id: number, user: UserBean) {
        const query = `update db_user set ? where id = ${id}`;
        return dbConnection.queryPromise(query, user).then(result => {
            return Promise.resolve(result);
        })
    }
}
const userDbServices = new UserDbServices();
export default  userDbServices;
