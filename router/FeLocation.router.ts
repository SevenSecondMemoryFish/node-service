import { wrapAsync } from './index.router';
import {Router} from "express";
import FeLocationController from "../controller/FeLocationController";

const $ = new FeLocationController();

export default (router: Router) => {
    router.post('/feLocation/save', wrapAsync($.saveFeLocation)).get('/feLocation/getActive', wrapAsync($.getActiveFeLocation))
};
