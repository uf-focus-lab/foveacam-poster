<script setup lang="ts">
defineProps<{ title: string; accent: string }>();
</script>

<template>
  <fieldset class="grid-box" :style="{ '--accent': accent }">
    <legend class="grid-title">{{ title }}</legend>
    <div class="grid-body">
      <slot />
    </div>
  </fieldset>
</template>

<style scoped>
.grid-box {
  --accent: var(--line);
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 0;
  min-inline-size: 0;
  min-height: 0;
  padding: 0 4mm 4mm;
  border: 1mm solid var(--accent);
  border-radius: 12mm;
  background: var(--paper);
  overflow: hidden;
}

.grid-title {
  padding: 0 0.4em;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: var(--accent);
  margin-left: 3mm;
  white-space: nowrap;
  transform: translateY(-20%);
}

.grid-body {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}
</style>
