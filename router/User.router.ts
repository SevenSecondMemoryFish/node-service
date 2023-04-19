import { Router }  from "express";
import UserController from "../controller/UserController";
const $ = new UserController();
// @ts-ignore
const wrapAsync = (fn) => {
    // @ts-ignore
    return function (req, res, next) {
        // @ts-ignore
        fn(req, res, next).catch(next);
    }
}

export default (router: Router) => {
    router.post('/user/addUser', $.addUser)
        .get('/user/get', wrapAsync($.getUser));
};
