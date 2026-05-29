<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

/* ── Unit conversion ──────────────────────────────────────────────────────
   The poster is authored entirely in millimetres. The sheet is A0 landscape
   (1189 × 841 mm); every enclosed component sizes itself in `mm` (physical
   lengths) or `em` (type, anchored to the mm base font set on `.poster`
   below, so `1em` == --fs-base mm everywhere inside).

   Browsers can't paint true millimetres on screen, so we scale the whole
   sheet to fit the viewport with one CSS transform; @media print resets it
   to 1:1 (see poster/index.css). */
const props = withDefaults(
  defineProps<{ pageWidthMm?: number; pageHeightMm?: number }>(),
  { pageWidthMm: 1189, pageHeightMm: 841 },
);
const MM_TO_PX = 96 / 25.4; // CSS reference pixel: 96px = 1in = 25.4mm
const pageWpx = computed(() => props.pageWidthMm * MM_TO_PX);
const pageHpx = computed(() => props.pageHeightMm * MM_TO_PX);

const stageRef = ref<HTMLElement>(); // scroll viewport
const scalerRef = ref<HTMLElement>(); // sized sheet footprint

const fitScale = ref(1);

// Zoom lives on an exponential scale: `zoomExp` is the level the controls move
// linearly, and the user multiplier is e^zoomExp — so each step/notch changes
// the on-screen scale geometrically (which is how zoom should feel). Clamped
// between 0.3× of fit and 100% actual size (the natural upper bound).
const zoomExp = ref(0);
const clampZoom = (exp: number) =>
  Math.min(Math.max(exp, Math.log(0.3)), -Math.log(fitScale.value));
const zoom = computed(() => Math.exp(zoomExp.value));
const scale = computed(() => fitScale.value * zoom.value);

function computeFit() {
  const pad = 40;
  fitScale.value = Math.min(
    (window.innerWidth - pad) / pageWpx.value,
    (window.innerHeight - pad) / pageHpx.value,
  );
}

const scalerStyle = computed(() => ({
  width: `${pageWpx.value * scale.value}px`,
  height: `${pageHpx.value * scale.value}px`,
}));
const posterStyle = computed(() => ({
  // Base font size, in mm — the anchor for every `em` inside the poster.
  "--fs-base": "16mm",
  "--page-w": `${props.pageWidthMm}`,
  "--page-h": `${props.pageHeightMm}`,
  fontSize: "var(--fs-base)",
  transform: `scale(${scale.value})`,
}));

const ZOOM_STEP = 0.4; // per button click → e^0.4 ≈ 1.49×
const zoomPct = computed(() => Math.round(scale.value * 100));
const zoomIn = () => (zoomExp.value = clampZoom(zoomExp.value + ZOOM_STEP));
const zoomOut = () => (zoomExp.value = clampZoom(zoomExp.value - ZOOM_STEP));
const fit = () => (zoomExp.value = 0);
const actual = () => (zoomExp.value = clampZoom(-Math.log(fitScale.value))); // 1:1
const print = () => window.print();

// Ctrl+wheel to zoom, anchored on the cursor. macOS delivers the trackpad
// pinch gesture as a wheel event with ctrlKey set, so this handles both pinch
// and ctrl+mouse-wheel. Must be passive:false so preventDefault() can suppress
// the browser's own page zoom. deltaY adds straight onto the exponential level
// (one mouse notch ≈ the toolbar's step). To keep the point under the cursor
// fixed, we record its fractional position on the sheet, zoom, then nudge the
// scroll so that same point is back under the cursor after relayout.
function onWheelZoom(e: WheelEvent) {
  if (!e.ctrlKey) return;
  e.preventDefault();

  const stage = stageRef.value;
  const scaler = scalerRef.value;
  const before = scaler?.getBoundingClientRect();
  const fx = before ? (e.clientX - before.left) / before.width : 0.5;
  const fy = before ? (e.clientY - before.top) / before.height : 0.5;

  zoomExp.value = clampZoom(zoomExp.value - e.deltaY * 0.005);

  if (stage && scaler) {
    nextTick(() => {
      const after = scaler.getBoundingClientRect();
      stage.scrollLeft += after.left + fx * after.width - e.clientX;
      stage.scrollTop += after.top + fy * after.height - e.clientY;
    });
  }
}

onMounted(() => {
  computeFit();
  window.addEventListener("resize", computeFit);
  window.addEventListener("wheel", onWheelZoom, { passive: false });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", computeFit);
  window.removeEventListener("wheel", onWheelZoom);
});

watch(
  () => [props.pageWidthMm, props.pageHeightMm],
  () => computeFit(),
);
</script>

<template>
  <div class="toolbar">
    <button @click="zoomOut" title="Zoom out">−</button>
    <span class="zoom-val">{{ zoomPct }}%</span>
    <button @click="zoomIn" title="Zoom in">+</button>
    <button @click="fit">Fit</button>
    <button @click="actual">100%</button>
    <button @click="print">Print / PDF</button>
  </div>

  <div ref="stageRef" class="stage">
    <div ref="scalerRef" class="sheet-scaler" :style="scalerStyle">
      <div class="poster" :style="posterStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
