// @ts-ignore
import {ResponseParamBean} from "../config/PromptUtils";
// @ts-ignore
export const wrapAsync = (fn) => {
    // @ts-ignore
    return function (req, res, next) {
        const response = new ResponseParamBean(res);
        fn(req, response, next)?.catch(next)
    }
}
