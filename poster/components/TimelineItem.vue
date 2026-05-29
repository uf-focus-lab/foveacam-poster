<script setup lang="ts">
// One timeline node: a rail dot and a `date | venue` header, with the main
// content (title + abstract) as the default slot. An optional "supplementary"
// slot holds the right-hand side (image or hint); when it's omitted, the main
// content spans the full width. `accent` colours the dot + date text (any CSS
// colour string), defaulting to currentColor.
withDefaults(defineProps<{ date: string; venue: string; accent?: string }>(), {
  accent: "currentColor",
});
</script>

<template>
  <li class="node" :style="{ '--accent': accent }">
    <span class="dot" />
    <div class="node-main">
      <div class="node-text">
        <div class="date-row">
          <span class="date">{{ date }}</span>
          <div class="sep"></div>
          <span class="venue">{{ venue }}</span>
        </div>
        <slot />
      </div>
      <slot name="supplementary" />
    </div>
  </li>
</template>

<style scoped>
.node {
  position: relative;
  padding-left: 1em;
}
.dot {
  position: absolute;
  left: 0.02em;
  top: 0.22em;
  width: 0.42em;
  height: 0.42em;
  border-radius: 50%;
  background: var(--accent);
  /* ring matches the dark column so the rail appears to pass behind the dot */
  box-shadow: 0 0 0 0.06em hsl(240 10% 22%);
}
.node-main {
  display: flex;
  gap: 0.6em;
  align-items: flex-start;
}
.node-main > :not(:first-child) {
  margin-top: auto;
  margin-bottom: auto;
}
.node-text {
  flex: 1;
  min-width: 0;
}
.date-row {
  font-size: 0.6em;
  display: flex;
  align-items: center;
  gap: 1ch;
}
.date {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--accent);
}
.sep {
  height: 1em;
  width: 1mm;
  background: hsl(0 0% 60%);
}
.venue {
  font-weight: 700;
  color: hsl(0 0% 80%);
}

/* Default-slot content — callers pass a plain <h4> (title) and <p> (abstract);
   :deep reaches the slotted, unscoped elements. */
.node-text :deep(h4) {
  margin: 0.1em 0 0;
  font-size: 0.74em;
  font-weight: 600;
  line-height: 1.15;
}
.node-text :deep(p) {
  margin: 0.25em 0 0;
  font-size: 0.6em;
  line-height: 1.2;
  color: hsl(0 0% 80%);
}
</style>
