import Mock from "mockjs";

//图表数据
let List = [];
export default {
  getstatisticlData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 8; i++) {
      List.push(
        Mock.mock({
          OPPO: Mock.Random.float(100, 8000, 0, 0),
          ViVo: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
          华为: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          Sony: Mock.Random.float(100, 8000, 0, 0),
          苹果: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    }
    return {
      code: 20000,
      data: {
        //饼图
        videoData: [
          {
            name: "OPPO",
            value: 1425,
          },
          {
            name: "ViVo",
            value: 2547,
          },
          {
            name: "小米",
            value: 1455,
          },
          {
            name: "华为",
            value: 3545,
          },
          {
            name: "三星",
            value: 1057,
          },
          {
            name: "魅族",
            value: 968,
          },
          {
            name: "Sony",
            value: 867,
          },
          {
            name: "苹果",
            value: 4542,
          },
        ],
        //柱状图
        userData: [
          {
            data: "周一",
            new: 105,
            active: 257,
          },
          {
            data: "周二",
            new: 144,
            active: 278,
          },
          {
            data: "周三",
            new: 83,
            active: 352,
          },
          {
            data: "周四",
            new: 98,
            active: 378,
          },
          {
            data: "周五",
            new: 145,
            active: 241,
          },
          {
            data: "周六",
            new: 247,
            active: 428,
          },
          {
            data: "周日",
            new: 241,
            active: 584,
          },
        ],
        //折线图
        orderData: {
          data1: [
            "7月1日",
            "7月2日",
            "7月3日",
            "7月4日",
            "7月5日",
            "7月6日",
            "7月7日",
            "7月8日",
          ],
          data: List,
        },
        //基础数据
        tableData: [
          {
            name: "OPPO",
            todayBuy: 52,
            monthBuy: 527,
            totalBuy: 8003,
          },
          {
            name: "ViVo",
            todayBuy: 114,
            monthBuy: 342,
            totalBuy: 8452,
          },
          {
            name: "小米",
            todayBuy: 528,
            monthBuy: 425,
            totalBuy: 9881,
          },
          {
            name: "华为",
            todayBuy: 142,
            monthBuy: 257,
            totalBuy: 3045,
          },
          {
            name: "三星",
            todayBuy: 50,
            monthBuy: 526,
            totalBuy: 1057,
          },
          {
            name: "魅族",
            todayBuy: 26,
            monthBuy: 452,
            totalBuy: 3044,
          },
          {
            name: "Sony",
            todayBuy: 15,
            monthBuy: 125,
            totalBuy: 725,
          },
          {
            name: "苹果",
            todayBuy: 235,
            monthBuy: 1425,
            totalBuy: 9942,
          },
        ],
      },
    };
  },
};
