import Vue from 'vue';
import hCore, { store } from "@hsui/core";
import "./reset.css";
import hui from 'h_ui';
import "h_ui/dist/h_ui.min.css"

import VueRouter from 'vue-router'
import router from './router'

Vue.use(hui);

Vue.use(VueRouter)

const app = hCore({
  extraModelOptions: {
    store,
  },
  router:router
});

app.start();
