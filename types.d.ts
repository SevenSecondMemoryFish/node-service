type BodyBean = string|number|boolean|object;

import express from 'express'
export declare interface ResponseBean extends express.Response{
    send(body: BodyBean): ResponseBean
    status(code: number): ResponseBean
}


export declare interface RequestBean extends express.Request {
    param(name: string, defaultValue?: any): any
    body?: any
    query?: any
}
