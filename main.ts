import express, { Application } from 'express';
const app = express();
import  { RequestBean, ResponseBean} from "./types";
import dbConnection from "./DbConnextion";
// @ts-ignore
const wrapAsync = (fn) => {
    // @ts-ignore
    return function (req, res, next) {
        // @ts-ignore
        fn(req, res, next).catch(next);
    }
}

// @ts-ignore
app.get('/', (req, res) => {
    const dict = {
        name: '1',
        age: 12
    }
    dbConnection.query('select runoob_id  from runoob_tbl', (err, runoob) => {
        // if (err) throw err;
        console.log('dbConnection', err, runoob)
    })
    console.log('res', req.query);
    res.status(200).send(dict);
});

const test = () => {
    return Promise.reject('你试啥');
}
// @ts-ignore
app.get('/user', wrapAsync((req, res, next) => {
    return test();
}))



// @ts-ignore
app.use( function (err, req, res, next) {
    console.log("Express", err);
    res.status(400);
    res.send('500');
})
app.listen(8081);

