<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Monday</th>
        <th scope="col">Thursday</th>
        <th scope="col">Sunday</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">22:00</th>
        <td><RadioShow show="PsychOmagic" producer="phren" /></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">23:00</th>
        <td><RadioShow show="Saturnalia" producer="Filthy Pagan" /></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">22:00</th>
        <td></td>
        <td><RadioShow show="Cosmodvck" producer="winter" /></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">23:00</th>
        <td></td>
        <td><RadioShow show="Umbra" producer="naboer" /></td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">20:00</th>
        <td></td>
        <td></td>
        <td><RadioShow show="Post-Engineering" producer="Nordsee" /></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  max-width: 50%;
}
.table tbody {
  color: var(--foreground-color);
}
.table tbody td {
  font-size: 0.75em;
  text-align: start;
}
.table tbody th {
  /* font-size: 1.25rem; */
}
.table thead th {
  /* font-size: 1.25rem; */
}
.table thead {
  color: var(--foreground-color);
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RadioShow from '@/components/Common/RadioShow.vue';

@Component({
  components: {
    RadioShow,
  },
})
export default class Schedule extends Vue {}
</script>
