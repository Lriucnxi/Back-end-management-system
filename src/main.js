import Vue from "vue";
import ElementUI from "element-ui";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./api/mock";
import Cookie from "js-cookie";

Vue.config.productionTip = false;
Vue.use(ElementUI);
/* Vue.use(Button);
Vue.use(Row); */

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //先判断token是否存在
  const token = Cookie.get("token");
  //如果token不存在，说明用户未登录，应该跳转到登录页
  if (!token && to.name !== "login") {
    next({ name: "login" });
    //如果token存在，说明用户登录，跳转至首页
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
