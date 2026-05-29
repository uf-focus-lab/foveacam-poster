<script setup lang="ts">
// Body region — the main content area (row 2, fills remaining height).
// Left column: history. Right column: FoveaCam++ (top) and FoveaCam Duo
// (bottom) split vertically. Each division exposes a named slot.
</script>

<template>
  <main class="region-body">
    <div class="col col-heritage">
      <section class="panel"><slot name="history" /></section>
    </div>
    <div class="col-stack">
      <div class="col col-iros">
        <section class="panel"><slot name="foveacam-plus" /></section>
      </div>
      <div class="col col-duo">
        <section class="panel"><slot name="foveacam-duo" /></section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.region-body {
  display: grid;
  grid-template-columns: 30fr 70fr;
  min-height: 0;
  overflow: hidden;
}
.col-stack {
  display: grid;
  grid-template-rows: 1fr 1fr;
  min-width: 0;
  min-height: 0;
}
.col {
  min-width: 0;
  min-height: 0;
}
.col:not(:first-child) {
  border-top: 1mm solid var(--line);
}
/* History relies on this dark backdrop; the right panels supply their own. */
.col-heritage {
  color: #fff;
  background: hsl(240 20% 10%);
}
section.panel {
  height: 100%;
  padding: 16mm 20mm;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
