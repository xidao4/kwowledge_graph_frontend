import Mock from 'mockjs2';
import { builder, getBody } from '../util';
import { showGraphData, graphData2 } from '../data';

const save = (options) => {
    const body = getBody(options);
    console.log('save mock: body', body);
    return builder("保存成功", 0, { 'Custom-Header': Mock.mock('@guid') });
};

const thumbnail = (options) => {
    const body = getBody(options);
    console.log('thumbnail mock: body', body);
    return builder("缩略图保存成功", 0, { 'Custom-Header': Mock.mock('@guid') });
};

const getPicElement = (options) => {
    const body = getBody(options);
    console.log('getPicElement mock body', body);
    return builder({
        picId: "0",
        ...showGraphData
    }, 0, { 'Custom-Header': Mock.mock('@guid') })
};

const getAll = (options) => {
    // const body = getBody(options);
    // console.log('getAll mock body', body);
    return builder({
        picId: "0",
        ...graphData2
    }, 0, { 'Custom-Header': Mock.mock('@guid') })
};

Mock.mock(/\/api\/graph\/save/, 'post', save);
Mock.mock(/\/api\/graph\/thumbnail/, 'post', thumbnail);
Mock.mock(/\/api\/graph\/getPicElements/, 'post', getPicElement);
Mock.mock(/\/api\/graph\/getAll/, 'post', getAll);
