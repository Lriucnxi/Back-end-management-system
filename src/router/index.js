import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import main from "../views/Main.vue";
import Mall from "../views/Mall.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    //主路由
    path: "/",
    component: main,
    name: "Main",
    redirect: "/home",
    //子路由
    children: [
      /*  { path: "/home", component: Home, name: "home" }, //首页
      { path: "/user", component: User, name: "user" }, //用户管理
      { path: "/mall", component: Mall, name: "mall" }, //商品管理
      { path: "/page1", component: PageOne, name: "page1" }, //页面一
      { path: "/page2", component: PageTwo, name: "page2" }, //页面二 */
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
