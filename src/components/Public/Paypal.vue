<template>
  <div style="width: 20%">
    <form action="https://www.paypal.com/donate" method="post" target="_top">
      <input type="hidden" name="hosted_button_id" value="5P4XYAKZQM5VA" />
      <button type="submit" id="completed-task" class="fabutton">
        <i class="fab fa-paypal fa-2x"></i>
      </button>
      <a href="#" class="icon" title="Instagram">
        <!-- <font-awesome-icon icon="fa-brands fa-paypal" /> -->
      </a>
    </form>
  </div>
</template>

<style scoped>
.fabutton {
  background: none;
  color: var(--foreground-color);
  padding: 0px;
  border: none;
}
</style>
