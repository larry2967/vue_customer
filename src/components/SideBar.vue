<template>
  <sidebar-menu :menu="menu" theme="white-theme" />
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          header: "Main Navigation",
          hiddenOnCollapse: true,
        },
        {
          href: { path: "/" },
          title: "Home",
          icon: "fa fa-bell",
        },
        {
          href: { path: "/info" },
          title: "CustomerInfo",
          icon: "fa fa-code",
        },
        {
          href: { path: "/potential" },
          title: "PotentialCustomer",
          icon: "fa fa-cogs",
        },
      ],
    };
  },
};
</script>

<style scoped>
.vsm--menu {
  width: 100px;
}
</style>
