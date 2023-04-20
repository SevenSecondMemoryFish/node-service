import { Router }  from "express";
import UserController from "../controller/UserController";
const $ = new UserController();
import { ResponseParamBean } from '../config/PromptUtils'
// @ts-ignore
const wrapAsync = (fn) => {
    // @ts-ignore
    return function (req, res, next) {
        const response = new ResponseParamBean(res);
        fn(req, response, next)?.catch(next)
    }
}

export default (router: Router) => {
    router.post('/user/addUser', wrapAsync($.addUser))
        .post('/user/update', wrapAsync($.updateUser))
        .get('/user/get', wrapAsync($.getUser));
};
