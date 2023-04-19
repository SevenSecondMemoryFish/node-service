import express, { Router } from 'express';
const app = express();
import userRouter from "./router/User.router";
// @ts-ignore
const wrapAsync = (fn) => {
    // @ts-ignore
    return function (req, res, next) {
        // @ts-ignore
        fn(req, res, next).catch(next);
    }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = Router({});
userRouter(router);
app.use(router);
// @ts-ignore
app.use( function (err, req, res, next) {
    console.log("Express", err);
    res.status(500);
    res.send('500');
})
app.listen(8081);

