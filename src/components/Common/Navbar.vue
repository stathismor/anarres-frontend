<template>
  <nav class="navbar navbar-expand navbar-dark bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../../../assets/img/logo.png"
          alt=""
          width="150"
          height="25"
          class="d-inline-block align-text-center"
        />
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="target('/')"
            exact
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="target('/about')"
            >About</router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Blog</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.border1 {
  box-shadow: 0 0 4px 0 var(--background-color), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 var(--background-color);
}
</style>

<script>
export default {
  methods: {
    target(path) {
      console.log('process.env.DEPLOY_ENV', process.env.DEPLOY_ENV);
      const base =
        process.env.DEPLOY_ENV === 'gh-pages' ? '/anarres-frontend' : '';
      return `${base}${path}`;
    },
  },
};
</script>
