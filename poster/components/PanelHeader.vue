<template>
  <header>
    <div class="attribution">
      <slot name="attribution"></slot>
    </div>
    <h2><slot></slot></h2>
  </header>
</template>

<style scoped>
header {
  margin-bottom: 10mm;
}

header h2 {
  margin: 0;
  font-size: 1.2em;
  font-weight: bolder;
}

header .attribution {
  font-size: 0.6em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

header :deep(.h-div) {
  width: 1mm;
  height: 1em;
  background: currentColor;
}

header :deep(.authors) {
  color: var(--text-2);
  font-style: italic;
  font-weight: 600;
}

header :deep(.venue) {
  font-weight: 800;
}
</style>
