import Mock from 'mockjs';
import { apiUrl } from './api.js';
const base = 'http://localhost:3000'
Mock.mock(base + apiUrl.plane, 'get', {
    code: 1,
    message: '管道数据',
    "data|2": [
        {
            "name": '@first',
            "bottom|2": [
                {
                    width: 20,
                    height: 30,
                    deep: 1800,
                    rotate: Math.PI / 4,
                    "axis|+1": [
                        {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        {
                            x: 0,
                            y: 10,
                            z: 0
                        },
                    ],//平移向量
                }],
            "slider|6": [
                {
                    width: 20,
                    height: 30,
                    deep: 1800,
                    rotate: Math.PI / 4,
                    "axis|+1": [
                        {
                            x: 0,
                            y: -1,
                            z: 1,
                            d: 2
                        },
                        {
                            x: 0,
                            y: 1,
                            z: 1,
                            d: 2
                        },
                        {
                            x: 0,
                            y: 0,
                            z: 2,
                            d: 0
                        },
                        {
                            x: 0,
                            y: 19,
                            z: 1,
                            d: 2
                        },
                        {
                            x: 0,
                            y: 21,
                            z: 1,
                            d: 2
                        },
                        {
                            x: 0,
                            y: 20,
                            z: 2,
                            d: 0
                        },
                    ],//平移向量
                }],
        }]
})