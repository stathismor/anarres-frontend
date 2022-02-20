<template>
  <!-- <div id="donate-button-container">
      <div id="donate-button"></div>
      <script
        src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        charset="UTF-8"
      ></script>
      <script>
        PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: '34U9EFS93HW6Q',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button');
      </script>
    </div> -->
  <div class="about container container-sm text-light">
    <div class="quote">
      <p>
        Music with no boundaries. From spacy synths to modern metal sounds, from
        folk to world sounds.
      </p>
      <p>Against every kind of oppression.</p>
    </div>
    <div class="social-container">
      <div class="title">Find us</div>
      <div class="card-group social-items">
        <div class="card social-item bg-transparent">
          <div class="card-body social-body">
            <a href="#" class="icon" title="Facebook">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
          </div>
        </div>
        <div class="card social-item bg-transparent">
          <div class="card-body social-body">
            <a href="#" class="icon" title="Instagram">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style all font awesome icons */
.about {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  /* height: 100%; */
  overflow: hidden;
  margin-top: 2.5rem;
  text-align: justify;
  font-style: italic;
  flex-grow: 1;
  /* font-size: 1.5rem; */
}
.quote {
  font-size: max(1em, 2vw);
}
.social-container {
  display: flex;
  flex-direction: column;
  width: 10rem;
  margin-top: auto;
  margin-bottom: 7rem;
  /* font-size: 20rem; */
}
.title {
  margin: 0;
  padding: 0;
  text-decoration: underline;
}
.social-items {
  width: 10rem;
  margin-top: auto;
  display: flex;
  /* font-size: 20rem; */
}
.social-body {
  padding: 0.25rem 1.5rem 0 0;
}
.social-item {
  margin-bottom: 0;
}
a:hover {
  color: var(--secondary-color);
}
@media (max-width: 575px) {
  .social-item {
    height: 2.5rem;
  }

  .social-container {
    margin-bottom: 5rem;
    /* font-size: 20rem; */
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '../components/Common/Icon.vue';
import Paypal from '../components/Public/Paypal.vue';

@Component({
  components: { Icon, Paypal },
})
export default class Home extends Vue {}
</script>
