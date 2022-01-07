<template>
  <div>
    <div>{{ show }}</div>
    <div>{{ producer }}</div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    show: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
  },
})
export default class RadioShow extends Vue {}
</script>
