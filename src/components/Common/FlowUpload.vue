<template>
  <div class="flow-upload">
    <div class="upload-progress">
      <div
        class="uploading-file pt-1"
        v-for="(file, _) in files"
        :id="'file_upload_' + file.uniqueIdentifier"
        :class="{
          'text-success': file.is_completed,
          'text-danger': file.error,
        }"
      >
        <h6 class="fileuploadname m-0">{{ file.name }}</h6>
        <div class="progress" v-if="!file.is_completed">
          <div
            class="progress-bar"
            :style="{ width: file.progress_percent + '%' }"
          ></div>
        </div>
        <div class="upload-status" v-if="file.error">
          {{ file.error }}
        </div>
        <div class="size">{{ formatFileSize(file.size) }}</div>
      </div>
    </div>
    <div class="file-drop-target" ref="file_drop_target">
      <translate key="lang_upload_target"
        >Drag file(s) here to upload or</translate
      >
      <button
        ref="file_browse_target"
        class="file-upload btn btn-primary text-center ml-1"
        type="button"
      >
        <translate key="lang_select_file">Select File</translate>
        <icon icon="cloud_upload"></icon>
      </button>
      <small class="file-name"></small>
      <input
        type="file"
        :accept="validMimeTypesList"
        :multiple="allowMultiple"
        style="visibility: hidden; position: absolute"
      />
    </div>
  </div>
</template>

<style lang="css">
div.flow-upload div.upload-progress {
  padding: 4px 0;
}
div.flow-upload div.upload-progress > div {
  padding: 3px 0;
}
div.flow-upload div.upload-progress .error {
  color: #a00;
}
div.flow-upload div.upload-progress .progress {
  margin-bottom: 5px;
}
div.flow-upload div.upload-progress .progress .progress-bar {
  border-bottom-width: 10px;
}
div.flow-upload div.upload-progress .progress .progress-bar::after {
  height: 10px;
}
div.flow-upload div.file-drop-target {
  padding: 25px 0;
  text-align: center;
}
div.flow-upload div.file-drop-target input {
  display: inline;
}
</style>

<script>
import formatFileSize from '~/functions/formatFileSize.js';
import Flow from '@flowjs/flow.js';
import Icon from './Icon';
import _ from 'lodash';

export default {
  name: 'FlowUpload',
  components: { Icon },
  emits: ['complete', 'success', 'error'],
  props: {
    targetUrl: String,
    allowMultiple: {
      type: Boolean,
      default: false,
    },
    validMimeTypes: {
      type: Array,
      default() {
        return ['*'];
      },
    },
    flowConfiguration: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      flow: null,
      files: [],
    };
  },
  mounted() {
    let defaultConfig = {
      target: () => {
        return this.targetUrl;
      },
      singleFile: !this.allowMultiple,
      headers: {
        Accept: 'application/json',
        'X-API-CSRF': App.api_csrf,
      },
      withCredentials: true,
      allowDuplicateUploads: true,
      fileParameterName: 'file_data',
      uploadMethod: 'POST',
      testMethod: 'GET',
      method: 'multipart',
      testChunks: false,
    };
    let config = _.defaultsDeep({}, this.flowConfiguration, defaultConfig);

    this.flow = new Flow(config);

    this.flow.assignBrowse(this.$refs.file_browse_target);
    this.flow.assignDrop(this.$refs.file_drop_target);

    this.flow.on('fileAdded', (file, event) => {
      file.progress_percent = 0;
      file.is_completed = false;
      file.error = null;
      file.is_visible = true;

      this.files.push(file);
      return true;
    });

    this.flow.on('filesSubmitted', (array, event) => {
      this.flow.upload();
    });

    this.flow.on('fileProgress', (file) => {
      file.progress_percent = file.progress() * 100;
    });

    this.flow.on('fileSuccess', (file, message) => {
      console.log(message);

      file.is_completed = true;
      let messageJson = JSON.parse(message);
      this.$emit('success', file, messageJson);
    });

    this.flow.on('fileError', (file, message) => {
      let messageJson = JSON.parse(message);
      file.error = messageJson.message;
      this.$emit('error', file, messageJson);
    });

    this.flow.on('error', (message, file, chunk) => {
      console.error(message, file, chunk);
    });

    this.flow.on('complete', () => {
      this.files = [];
      this.$emit('complete');
    });
  },
  computed: {
    validMimeTypesList() {
      return this.validMimeTypes.join(', ');
    },
  },
  methods: {
    formatFileSize(bytes) {
      return formatFileSize(bytes);
    },
  },
};
</script>
