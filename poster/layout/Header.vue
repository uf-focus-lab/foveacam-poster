<script setup lang="ts">
// Header region — top band of the sheet (row 1 of the poster grid).
// `height` and `pad` (numbers = mm, strings = explicit CSS length) are driven
// by the parent. Lays its slotted content out as a flex row, pushed to the
// edges (space-between).
import { size, type Size } from "lib/sizes";

withDefaults(defineProps<{ height?: Size; pad?: Size }>(), {
  height: 90,
  pad: 10,
});
</script>

<template>
  <header
    :style="{ height: size(height), padding: size(pad) }"
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(
        110deg,
        hsl(214 88% 12%) 0%,
        hsl(209 70% 27%) 100%
      );
      color: white;
    "
  >
    <slot />
  </header>
</template>
