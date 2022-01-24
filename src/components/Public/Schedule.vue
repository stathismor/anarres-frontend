<template>
  <div class="container container-sm schedule-container">
    <div class="card bg-transparent border-0 h-100">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs border-bottom border-3">
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('monday')"
              :class="{
                active: isActive('monday'),
                'text-danger': isActive('monday'),
              }"
              href="#monday"
              >Monday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('tuesday')"
              :class="{
                active: isActive('tuesday'),
                'text-danger': isActive('tuesday'),
              }"
              href="#tuesday"
              >Tuesday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('wednesday')"
              :class="{
                active: isActive('wednesday'),
                'text-danger': isActive('wednesday'),
              }"
              href="#wednesday"
              >Wednesday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('thursday')"
              :class="{
                active: isActive('thursday'),
                'text-danger': isActive('thursday'),
              }"
              href="#thursday"
              >Thursday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('friday')"
              :class="{
                active: isActive('friday'),
                'text-danger': isActive('friday'),
              }"
              href="#friday"
              >Friday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('saturday')"
              :class="{
                active: isActive('saturday'),
                'text-danger': isActive('saturday'),
              }"
              href="#saturday"
              >Saturday</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link border-0 p-2 bg-transparent text-light"
              @click.prevent="setActive('sunday')"
              :class="{
                active: isActive('sunday'),
                'text-danger': isActive('sunday'),
              }"
              href="#sunday"
              >Sunday</a
            >
          </li>
        </ul>
      </div>
      <div class="tab-content card-body text-light h-100">
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('monday') }"
          id="monday"
        >
          <div class="schedule-day">
            <broadcast
              producer="winter"
              title="Smokey bars and single malts"
              time="00:00 - 06:00"
            />
            <broadcast
              producer="naboer-morning"
              title="Early Neural Activations"
              time="06:00 - 12:00"
            />
            <broadcast
              producer="filthy-afternoon"
              title="Noonwraith"
              time="12:00 - 18:00"
            />
            <broadcast
              producer="naboer-evening"
              title="Ganuma de Anarres"
              time="18:00 - 21:00"
            />
            <broadcast
              producer="Giwta + El"
              title="Cosmic Candy"
              time="21:00 - 22:00"
              isLive="true"
            />
            <broadcast
              producer="phren"
              title="Psychomagic"
              time="22:00 - 23:00"
              isLive="true"
            />
            <broadcast
              producer="filthy"
              title="Saturnalia"
              time="23:00 - 00:00"
              isLive="true"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('tuesday') }"
          id="tuesday"
        >
          <div class="schedule-day">
            <broadcast
              producer="filthy-night"
              title="Dying after Midnight"
              time="00:00 - 06:00"
            />
            <broadcast
              producer="naboer-morning"
              title="Echoes in the Exoshpere"
              time="06:00 - 12:00"
            />
            <broadcast
              producer="naboer-afternoon"
              title="Dancing in a Batcave"
              time="12:00 - 18:00"
            />
            <broadcast
              producer="winter-evening"
              title="Black is the warmest colour"
              time="18:00 - 00:00"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('wednesday') }"
          id="wednesday"
        >
          <div class="schedule-day">
            <broadcast producer="winter-night" time="00:00 - 06:00" />
            <broadcast producer="filhty-morning" time="06:00 - 12:00" />
            <broadcast producer="winter-afternoon" time="12:00 - 18:00" />
            <broadcast producer="filhty-evening" time="18:00 - 21:00" />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('thursday') }"
          id="thursday"
        >
          <div class="schedule-day">
            <broadcast producer="filhty-night" time="00:00 - 06:00" />
            <broadcast producer="winter-morning" time="06:00 - 12:00" />
            <broadcast producer="filthy-afternoon" time="12:00 - 18:00" />
            <broadcast producer="phren-evening" time="18:00 - 22:00" />
            <broadcast
              producer="winter"
              title="Cosmodvck"
              time="22:00 - 23:00"
            />
            <broadcast producer="naboer" title="Umbra" time="23:00 - 00:00" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 37rem;
}
.schedule-day {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
}
</style>

<script>
import Broadcast from '@/components/Common/Broadcast.vue';

export default {
  components: {
    Broadcast,
  },
  data() {
    return {
      activeItem: 'monday',
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
};
</script>
