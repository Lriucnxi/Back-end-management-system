<template>
  <div class="header-cintainer">
    <div class="l-content">
      <el-button
        style="margin-right: 20px"
        @click="handleMune"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
        >
          {{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.jpg" alt="用户头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";

export default {
  data() {
    return {};
  },
  methods: {
    handleMune() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "cancel") {
        //清除cookie中的tooken
        Cookie.remove("token");
        //清楚cookie中的menu
        Cookie.remove("menu");
        //跳转登录页面
        this.$router.push("/login");
      }
    },
  },
  //解构数据用于面包屑
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header-cintainer {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between; //两边
  align-items: center; //上下
}

.text {
  color: #fff;
  margin-left: 10px;
  font-size: 14px;
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;

  /deep/.el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;

      &.is-link {
        color: #808080;
      }
    }

    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>