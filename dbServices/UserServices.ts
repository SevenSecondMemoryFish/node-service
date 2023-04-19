import dbConnection from "../dbMysql/DbConnextion";
interface UserBean {
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
}
const userDbServices = new UserDbServices();
export default  userDbServices;
