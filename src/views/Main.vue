<template>
  <div>
    <el-container>
      <el-aside width="auto"><nav-menu /></el-aside>
      <el-container>
        <el-header>
          <cheader />
        </el-header>
        <tag />
        <el-main>
          <!-- 路由器出口 -->
          <!-- 路由器匹配到的组件渲染在这里 -->
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Cheader from "../components/Cheader.vue";
import tag from "../components/tag.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavMenu,
    Cheader,
    tag,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>
