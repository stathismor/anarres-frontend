<template>
  <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="#">
      <img
        src="../../../assets/img/background.svg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      Anarres.fm
    </a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <router-link class="nav-link" active-class="active" to="/"
          >Home</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" active-class="active" to="/about"
          >About</router-link
        >
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Blog</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--primary-color);
  border-radius: 4px;
  box-shadow: 0 0 4px 0 var(--background-color), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 var(--background-color);
}
nav a {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
