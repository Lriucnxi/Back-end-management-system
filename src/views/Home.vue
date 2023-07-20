<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.jpg" alt="用户头像" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>
            上次登录时间：<span>{{ nowTime }}</span>
          </p>
          <p>上次登录地点：<span>中国</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 457px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
          >
          </el-table-column>
          <!-- <el-table-column prop="todayBuy" label="今日销售额">
          </el-table-column>
          <el-table-column prop="monthBuy" label="本月销售额">
          </el-table-column>
          <el-table-column prop="totalBuy" label="总销售额">
          </el-table-column> -->
        </el-table>
      </el-card>
      <div class="grid-content bg-purple"></div>
    </el-col>

    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          >
          </i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
      <div class="grid-content bg-purple-light"></div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      nowTime: "",
      //数据
      tableData: [
        /*
        {
          name: 'OPPO',
          todayBuy: 52,
          monthBuy: 527,
          totalBuy: 8003
        }, {
          name: 'ViVo',
          todayBuy: 114,
          monthBuy: 342,
          totalBuy: 8452
        }, {
          name: '小米',
          todayBuy: 528,
          monthBuy: 425,
          totalBuy: 9881
        }, {
          name: '华为',
          todayBuy: 142,
          monthBuy: 257,
          totalBuy: 3045
        }, {
          name: '三星',
          todayBuy: 50,
          monthBuy: 526,
          totalBuy: 1057
        }, {
          name: '魅族',
          todayBuy: 26,
          monthBuy: 452,
          totalBuy: 3044
        }, {
          name: 'Sony',
          todayBuy: 15,
          monthBuy: 125,
          totalBuy: 725
        }, {
          name: '苹果',
          todayBuy: 235,
          monthBuy: 1425,
          totalBuy: 9942
        }*/
      ],
      //key，val
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销售额",
        monthBuy: "本月销售额",
        totalBuy: "总销售额",
      },
      //订单数据
      countData: [
        {
          name: "今日支付订单",
          value: 1569,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 236,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 15,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 18998,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1668,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 357,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      //基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定图表的配置项和数据
      var echarts1option = {};
      //处理数据xAxis
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };

      echarts1option.tooltip = {
        trigger: "axis",
        appendToBody: true /* 设置以window为根节点向外浮动 */,
      };
      echarts1option.xAxis = { data: orderData.data1 };
      echarts1option.yAxis = {};
      echarts1option.legend = xAxisData;

      echarts1option.series = [];
      xAxis.forEach((key) => {
        echarts1option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      //使用指定的配置项和数据显示图表
      echarts1.setOption(echarts1option);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2option = {
        legend: {
          //图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", //类目轴
          data: userData.map((item) => item.data),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      //使用指定的配置项和数据显示图表
      echarts2.setOption(echarts2option);

      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
          "#bce672",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      //使用指定的配置项和数据显示图表
      echarts3.setOption(echarts3option);
      //设置图表随着窗口的变动而变动
      window.onresize = function () {
        echarts1.resize();
        echarts2.resize();
        echarts3.resize();
      };
    });
  },
  methods: {
    //获取当前年月日
    getTime() {
      let dt = new Date();
      var y = dt.getFullYear();
      var mt = (dt.getMonth() + 1).toString().padStart(2, "0");
      var day = dt.getDate().toString().padStart(2, "0");
      this.nowTime = y + "-" + mt + "-" + day;
    },
  },
  created() {
    this.getTime();
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap; //强制换行
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: white;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column; //沿主轴上下对齐
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .desc {
      font-size: 14px;
      /* text-align: center; */
      color: #999999;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>
