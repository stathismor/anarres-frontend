<template>
  <b-modal
    size="lg"
    id="request_modal"
    ref="modal"
    title="Request a Song"
    hide-footer
  >
    <song-request
      :request-list-uri="requestListUri"
      :custom-fields="customFields"
      @submitted="doClose"
    ></song-request>
  </b-modal>
</template>

<script>
import SongRequest from '../Requests';

export default {
  components: { SongRequest },
  props: {
    requestListUri: {
      type: String,
      required: true,
    },
    customFields: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    doClose() {
      this.$refs.modal.hide();
    },
  },
};
</script>
