<template>
  <div>
    <div>
      <NavBar></NavBar>
    </div>
    <div>
      <SideBar></SideBar>
      <router-view />
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
