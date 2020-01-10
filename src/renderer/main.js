import Vue from "vue";
import axios from "axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import locale from "view-design/dist/locale/en-US";
Vue.use(require("vue-moment"));
import App from "./App";
import router from "./router";
import store from "./store";

Vue.use(ViewUI, { locale });
Vue.component("navigation", require("./components/Navigation").default);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.filter("ucwords", function(str) {
  str = str.toString();
  return (str + "").replace(/^(.)|\s+(.)/g, function($1) {
    return $1.toUpperCase();
  });
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
