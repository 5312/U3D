let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock
let cors = require('cors');
let app = express();        //实例化express
app.use(cors())

app.get('/home/h', function (req, res) {
  res.json(Mock.mock({
    code: 1,
    message: '隧道',
    "group": {
      "name": '@first',
      "position|+1": [
        {
          x: 500,
          y: 0,
          z: 0
        }
      ],
      "rotation|+1": [
        {
          x: -0.11,
          y: 0.93,
          z: 0.38
        }
      ],
      "data|2": [
        {
          "name": '@first',
          width: 100,
          height: 100,
          deep: 20000,
          "position|+1": [
            {
              x: 0,
              y: 0,
              z: 0
            }, {
              x: 0,
              y: 0,
              z: -300
            }
          ],
          "rotation|+1": [
            {
              x: 0,
              y: 0,
              z: 0
            }, {
              x: 0,
              y: 0,
              z: 0
            }
          ]
        }
      ]
    }
  }))
})
app.get('/Plane/plane', function (req, res) {
  res.json(Mock.mock({
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
  }))
})
app.listen('3021', () => {
  console.log('reload--> 3021')
})

