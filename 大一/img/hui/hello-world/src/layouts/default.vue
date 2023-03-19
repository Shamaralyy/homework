<template>
  <div>
    <Header></Header>

    <div class="layout">
      <h-row name="flex">
        <h-col span="5" class="layout-menu-left">
          <h-menu
            active-name="1-2"
            theme="dark"
            width="auto"
            :open-names="['1']"
          >
            <div class="layout-logo-left"></div>
            <h-submenu name="1">
              <template slot="title">
                <h-icon name="mail"></h-icon>
                首页
              </template>
            </h-submenu>
            <h-submenu name="2">
              <template slot="title">
                <h-icon name="mail"></h-icon>
                账户管理
              </template>
              <h-menu-item name="2-1">开户</h-menu-item>
              <h-menu-item name="2-2">选项 2</h-menu-item>
            </h-submenu>
            <h-submenu name="3">
              <template slot="title">
                <h-icon name="mail"></h-icon>
                交易管理
              </template>
              <h-menu-item name="3-1">产品购买</h-menu-item>
              <h-menu-item name="3-2">产品赎回</h-menu-item>
              <h-menu-item name="3-3">撤销交易申请</h-menu-item>
            </h-submenu>
            <h-submenu name="4">
              <template slot="title">
                <h-icon name="mail"></h-icon>
                查询管理
              </template>
              <h-menu-item name="4-1">申请查询</h-menu-item>
              <h-menu-item name="4-2">交易撤单</h-menu-item>
            </h-submenu>
          </h-menu>
        </h-col>
        <h-col span="19">
          <div class="layout-header"></div>
          <div class="layout-breadcrumb">
            <h-breadcrumb>
              <h-breadcrumb-item href="#">首页</h-breadcrumb-item>

              <router-link to="/open">
                <h-breadcrumb-item href="#">个人开户</h-breadcrumb-item>
              </router-link>

              <router-link to="/manage">
                <h-breadcrumb-item href="#">产品管理</h-breadcrumb-item>
              </router-link>

              <router-link to="/purchase">
                <h-breadcrumb-item href="#">产品购买</h-breadcrumb-item>
              </router-link>

              <router-link to="/redeem">
                <h-breadcrumb-item href="#">产品赎回</h-breadcrumb-item>
              </router-link>

              <h-breadcrumb-item href="#">产品份额信息查询</h-breadcrumb-item>

              <router-link to="/inquiry">
                <h-breadcrumb-item href="#">
                  交易通用信息查询
                </h-breadcrumb-item>
              </router-link>
            </h-breadcrumb>
          </div>
          <div class="layout-content">
            <div class="layout-content-main">
              <!-- <RedeemMessage></RedeemMessage> -->
              <!-- <RedeemSuccess></RedeemSuccess> -->
              <!-- <Inquiry></Inquiry> -->
              <!-- <Risk></Risk> -->

              <router-view></router-view>
            </div>
          </div>
        </h-col>
      </h-row>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

//开户
import Risk from "../components/Risk.vue";

// 赎回
import RedeemMessage from "../components/RedeemMessage.vue";
import RedeemSuccess from "../components/RedeemSuccess.vue";

// 查询
import Inquiry from "../components/Inquiry.vue";

export default {
  data() {
    return {
      isCollapse: "false",
      // 风险啊评估结果路径
    };
  },
  components: {
    Header,
    Risk,
    Inquiry,
    RedeemSuccess,
    RedeemMessage,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>