<template>
  <div class="container-fluid">
    <div class="row">
      <NavBar class="page-header"></NavBar>
    </div>
    <div class="row">
      <SideBar class="col-md-3"></SideBar>
      <router-view class="col-md-9" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
  },
};
</script>

<style></style>
