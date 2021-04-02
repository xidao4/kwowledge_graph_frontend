import Mock from 'mockjs2';
import { builder, getBody } from '../util';

const save = (options) => {
    const body = getBody(options);
    console.log('save mock: body', body);
    return builder({
        code: 0,
        data: "保存成功"
    }, '', 200, { 'Custom-Header': Mock.mock('@guid') });
};

const thumbnail = (options) => {
    const body = getBody(options);
    console.log('thumbnail mock: body', body);
    return builder({
        code: 0,
        data: "缩略图保存成功"
    }, '', 200, { 'Custom-Header': Mock.mock('@guid') });
};

Mock.mock(/\/api\/graph\/save/, 'post', save);
Mock.mock(/\/api\/graph\/thumbnail/, 'post', thumbnail);
