<template>
  <div class="container container-sm schedule-container">
    <div class="schedule-title-container">
      <h3 class="text-light fw-bold schedule-title">Schedule</h3>
      <h16 class="schedule-title schedule-title-timezone">(EET)</h16>
    </div>
    <div class="card bg-transparent border-0 h-100">
      <div class="card-header border-bottom-0 schedule-header">
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
              tags="Darkjazz, Noir Jazz, Nu Jazz"
              title="Smokey bars and single malts"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Indie, Alternative, Punk"
              title="Early Neural Activations"
              time="06:00 - 12:00"
            />
            <broadcast
              tags="Folk and Chill"
              title="Noonwraith"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Synthwave, Coldwave, Darkwave"
              title="Ganuma de Anarres"
              time="18:00 - 21:00"
            />
            <broadcast
              producer="ΜαΓιώ"
              title="Cosmic Candy"
              time="21:00 - 22:00"
              :isLive="true"
            />
            <broadcast
              producer="phren"
              title="Psychomagic"
              time="22:00 - 23:00"
              :isLive="true"
            />
            <broadcast
              producer="Filthy Pagan"
              title="Saturnalia"
              time="23:00 - 00:00"
              :isLive="true"
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
              tags="Atmospheric Black/Doom Metal"
              title="Dying after Midnight"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="IDM Ambient, Future Garage"
              title="Echoes in the Exoshpere"
              time="06:00 - 12:00"
            />
            <broadcast
              tags="Post Punk, New Wave"
              title="Dancing in a Batcave"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Post Hardcore, Blackgaze, Post Metal"
              title="Black is the Warmest Colour"
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
            <broadcast
              tags="Slow and Depressive"
              title="Depression in a can"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Psych Folk, Acid Folk"
              title="Acid Vibrations"
              time="06:00 - 12:00"
            />
            <broadcast
              tags="Post Rock"
              title="Long name!For.Post.Playlist"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Psychedelic, Garage, World Vibes"
              title="Psychonautics"
              time="18:00 - 21:00"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('thursday') }"
          id="thursday"
        >
          <div class="schedule-day">
            <broadcast
              tags="Atmospheric Black/Doom Metal"
              title="Dying after Midnight"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Dungeon Synth/Ambient"
              title="Dungeons, Synths and Irene"
              time="06:00 - 12:00"
            />
            <broadcast
              tags="Post Punk, New Wave"
              title="Dancing in a Batcave"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Post Hardcore, Blackgaze, Post Metal"
              title="Black is the Warmest Colour"
              time="18:00 - 22:00"
            />
            <broadcast
              producer="winter"
              title="Cosmodvck"
              time="22:00 - 23:00"
              :isLive="true"
            />
            <broadcast
              producer="naboer"
              title="Umbra"
              time="23:00 - 00:00"
              :isLive="true"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('friday') }"
          id="friday"
        >
          <div class="schedule-day">
            <broadcast
              tags="Darkjazz, Noir Jazz, Nu Jazz"
              title="Smokey bars and single malts"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Psych Folk, Acid Folk"
              title="Acid Vibrations"
              time="06:00 - 12:00"
            />
            <broadcast
              tags="Post Punk, New Wave"
              title="Dancing in a Batcave"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Power/Heavy/Thrash Metal"
              title="Steel Life"
              time="18:00 - 00:00"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('saturday') }"
          id="saturday"
        >
          <div class="schedule-day">
            <broadcast
              tags="Slow and Depressive"
              title="Depression in a can"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Dungeon Synth/Ambient"
              title="Dungeons, Synths and Irene"
              time="06:00 - 12:30"
            />
            <broadcast
              producer="viktoria"
              title="Ιντερμέδιο (bi-weekly)"
              time="12:30 - 13:30"
              :isLive="true"
            />
            <broadcast
              tags="Folk and Chill"
              title="Noonwraith"
              time="13:30 - 18:00"
            />
            <broadcast
              tags="Psychedelic, Garage, World Vibes"
              title="Psychonautics"
              time="18:00 - 00:00"
            />
          </div>
        </div>
        <div
          class="tab-pane fade h-100"
          :class="{ 'active show': isActive('sunday') }"
          id="sunday"
        >
          <div class="schedule-day">
            <broadcast
              tags="Darkjazz, Noir Jazz, Nu Jazz"
              title="Smokey bars and single malts"
              time="00:00 - 06:00"
            />
            <broadcast
              tags="Indie, Alternative, Punk"
              title="Early Neural Activations"
              time="06:00 - 10:00"
            />
            <broadcast
              tags=""
              title="Guest Playlist (victoria)"
              time="10:00 - 12:00"
            />
            <broadcast
              tags="Post Rock"
              title="Long name!For.Post.Playlist"
              time="12:00 - 18:00"
            />
            <broadcast
              tags="Synthwave, Coldwave, Darkwave"
              title="Ganuma de Anarres"
              time="18:00 - 20:00"
            />
            <broadcast
              producer="saf"
              title="post-engineering"
              time="20:00 - 22:00"
              :isLive="true"
            />
            <broadcast
              tags=""
              title="Guest Playlist (victoria)"
              time="22:00 - 00:00"
            />
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
.schedule-header {
  padding-top: 0;
}
.schedule-title-container {
  display: flex;
  justify-content: center;
}
.schedule-title {
  margin-top: 1rem;
  line-height: 1rem;
}
.schedule-title-timezone {
  color: gray;
  margin-left: 0.5rem;
  font-size: 15px;
}
.schedule-day {
  height: 100%;
  display: flex;
  flex-direction: column;
}
@media (max-width: 575px) {
  .schedule-container {
    font-size: 90%;
  }
  .schedule-title-timezone {
    font-size: 10px;
  }
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
      activeItem: new Date()
        .toLocaleString('en-us', { weekday: 'long' })
        .toLowerCase(),
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
