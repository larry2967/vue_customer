<template>
  <div class="container-fluid">
    <NavBar class="page-header"></NavBar>

    <!-- <div class="row">
      <div class="col text-center">
        <router-link to="/">股權架構圖</router-link>
      </div>
      <div class="col text-center">
        <router-link to="/info">本行顧客</router-link>
      </div>
      <div class="col text-center">
        <router-link to="/potential">關係戶</router-link>
      </div>
    </div> -->
    <!-- <SideBar class="col side-bar"></SideBar> -->

    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
// import SideBar from "@/components/SideBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    // SideBar,
  },
};
</script>

<style scoped></style>
>
