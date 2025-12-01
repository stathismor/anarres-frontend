<template>
  <div class="skeleton-wrapper">
    <div v-for="n in count" :key="n" class="skeleton-card">
      <div v-if="showImage" class="skeleton-image skeleton-animate"></div>
      <div class="skeleton-content">
        <div class="skeleton-title skeleton-animate"></div>
        <div class="skeleton-meta">
          <div class="skeleton-text skeleton-text-sm skeleton-animate"></div>
          <div class="skeleton-text skeleton-text-sm skeleton-animate"></div>
        </div>
        <div class="skeleton-body">
          <div class="skeleton-text skeleton-animate"></div>
          <div class="skeleton-text skeleton-animate"></div>
          <div class="skeleton-text skeleton-text-short skeleton-animate"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SkeletonLoader extends Vue {
  @Prop({ default: 3 }) count!: number;
  @Prop({ default: true }) showImage!: boolean;
}
</script>

<style scoped>
.skeleton-wrapper {
  width: 100%;
}

.skeleton-card {
  background-color: rgba(38, 38, 38, 0.8);
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skeleton-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-title {
  height: 2rem;
  width: 70%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
}

.skeleton-meta {
  display: flex;
  gap: 1rem;
}

.skeleton-text {
  height: 1rem;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
}

.skeleton-text-sm {
  width: 30%;
}

.skeleton-text-short {
  width: 60%;
}

.skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.skeleton-animate {
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .skeleton-card {
    padding: 1.5rem;
  }

  .skeleton-image {
    height: 150px;
  }
}
</style>
