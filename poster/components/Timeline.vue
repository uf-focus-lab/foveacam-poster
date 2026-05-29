<script setup lang="ts">
// Vertical timeline rail — draws the connecting line and distributes its
// items (TimelineItem) down the available height. Items go in the default slot.
</script>

<template>
  <ol class="timeline">
    <slot />
  </ol>
</template>

<style scoped>
.timeline {
  position: relative;
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 0.2em;
  top: 0.25em;
  bottom: 0.25em;
  width: 0.04em;
  background: hsl(0 0% 100% / 0.22);
}
</style>
