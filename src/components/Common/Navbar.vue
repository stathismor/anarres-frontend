<template>
  <nav class="navbar navbar-expand navbar-dark bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../../../assets/img/logo.svg"
          alt=""
          width="150"
          height="25"
          class="d-inline-block align-text-center"
        />
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
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
