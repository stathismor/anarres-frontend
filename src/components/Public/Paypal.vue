<template>
  <div id="donate-button-container"></div>
</template>

<style scoped>
.fabutton {
  background: none;
  color: var(--foreground-color);
  padding: 0px;
  border: none;
}
</style>

<script>
import paypalImage from '/assets/img/paypal.png';

export default {
  mounted: function () {
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
    script.addEventListener('load', this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      window.PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: 'UDTQUKA3SGJH8',
        image: {
          src: paypalImage,
          alt: 'Donate with PayPal button',
          title: 'Donate to anarres fm!',
        },
      }).render('#donate-button-container');

      // HACK: Major one
      let currentWidth = window.innerWidth;
      const mediaQuery = window.matchMedia('(max-width: 575px)');
      if (mediaQuery.matches) {
        document.getElementById('donate-button').style.width = '24px';
        document.getElementById('donate-button').style.height = '24px';
      }

      window.addEventListener('resize', function (event) {
        if (window.innerWidth < 575 && currentWidth > 575) {
          currentWidth = window.innerWidth;
          document.getElementById('donate-button').style.width = '24px';
          document.getElementById('donate-button').style.height = '24px';
        } else if (window.innerWidth > 575 && currentWidth < 575) {
          currentWidth = window.innerWidth;
          document.getElementById('donate-button').style.width = '32px';
          document.getElementById('donate-button').style.height = '32px';
        }
      });
    },
  },
};
</script>
