let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock
let cors = require('cors');
const { MathUtils } = require('three');
let app = express();        //实例化express
app.use(cors())

app.get('/home/tunnel', function (req, res) {
  res.json(Mock.mock({
    code: 1,
    message: '隧道',
    "group": {
      "data|2": [
        {
          "name": '@first',
          width: 12000,
          height: 300,
          rlh: 200,
          "position|+1": [
            {
              x: -1000,
              y: 0,
              z: 0
            }, {
              x: 1000,
              y: 0,
              z: 0
            }
          ],
          "rotation|+1": [
            {
              rx: Math.PI / 2,
              ry: -Math.PI / 2,
              rz: 0
            }, {
              rx: Math.PI / 2,
              ry: Math.PI / 2,
              rz: 0
            }
          ]
        }
      ],
      "corner": {
        "data|2": [
          {
            "name": 'corner',
            "radius|+1": [1150, 1150],
            rlh: 200,
            height: 300,// 半径 -- 隧道的宽
            segments: 60,
            thetaStart: 0,
            "thetaLength|+1": [
              Math.PI, Math.PI
            ],
            "position|+1": [
              {
                x: 0,
                y: 0,
                z: 6000
              },
              {
                x: 0,
                y: 0,
                z: -6000
              }
            ],
            "rotation|+1": [
              {
                rx: 0,
                ry: 0,
                rz: 0
              },
              {
                rx: 0,
                ry: Math.PI,
                rz: 0
              }
            ]
          }
        ],

      }
    }
  }))
})
app.get('/home/h', function (req, res) {
  res.json(Mock.mock({
    code: 1,
    message: '隧道',
    "group": {
      "name": 'homeGroup',
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
          deep: 2000000,
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

