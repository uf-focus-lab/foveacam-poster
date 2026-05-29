<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { toString } from "qrcode";

const props = defineProps<{ url: string }>();

const svgMarkup = ref("");

watchEffect(async () => {
  if (!props.url) {
    svgMarkup.value = "";
    return;
  }

  const raw = await toString(props.url, {
    type: "svg",
    margin: 0,
    color: {
      dark: "#000000",
      light: "#0000",
    },
  });
  svgMarkup.value = raw.replace(/#000000/gi, "currentColor");
});
</script>

<template>
  <span class="qr-code" v-html="svgMarkup" />
</template>

<style scoped>
.qr-code {
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}

.qr-code :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
