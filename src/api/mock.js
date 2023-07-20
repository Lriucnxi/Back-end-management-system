import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import user from "./mockServeData/user";
import permossion from "./mockServeData/permossion";

//定义mock请求拦截
Mock.mock("/api/home/getData", homeApi.getstatisticlData);

//用户列表的数据
Mock.mock("/api/user/add", "post", user.createUser);
Mock.mock("/api/user/edit", "post", user.updateUser);
Mock.mock("/api/user/del", "post", user.deleteUser);
Mock.mock(/api\/user\/getUser/, user.getUserList);
Mock.mock(/api\/permossion\/getMenu/, "post", permossion.getMenu);
