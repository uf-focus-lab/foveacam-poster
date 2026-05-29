<script setup lang="ts">
import Focus from "poster/assets/focus.svg";
import QRCode from "poster/components/QRCode.vue";
</script>

<template>
  <!-- left: occasion · title · subtitle · byline -->
  <div>
    <h1
      style="
        margin: 0;
        padding: 0;
        font-size: 1.97em;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;
      "
    >
      Adaptive Foveated Computational Cameras
    </h1>
    <p
      style="
        margin: 0;
        padding: 0;
        font-size: 1em;
        font-weight: bold;
        opacity: 0.8;
        margin-top: 0.4em;
      "
    >
      Bio-inspired, MEMS-steered sensors that decide exactly where and when to
      sense
    </p>
  </div>
  <div class="h-div"></div>
  <div class="funding">
    <h4>Funding Sources</h4>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 7mm;
      "
    >
      <img
        src="/logos/nsf-dark.webp"
        alt="National Science Foundation"
        style="height: 26mm; width: auto"
      />
      <img
        src="/logos/onr.webp"
        alt="Office of Naval Research"
        style="height: 26mm; width: auto"
      />
    </div>
  </div>
  <div class="h-div"></div>
  <div class="id-card">
    <h4 class="people">Sanjeev J. Koppal</h4>
    <span class="title">Associate Professor</span>
    <a class="email" href="mailto:sjkoppal@ece.ufl.edu">sjkoppal@ece.ufl.edu</a>
  </div>
  <div class="h-div"></div>
  <div class="logos">
    <div class="focus-lab-logo">
      <Focus role="img" aria-label="FOCUS Lab" />
      <span style="line-height: 80%">Lab</span>
      <QRCode
        url="https://uf-focus-lab.github.io/foveacam-poster/"
        role="img"
        aria-label="Lab website QR code"
        style="height: 1em; width: 1em"
      />
    </div>
    <div class="v-div"></div>
    <img
      src="/logos/uf-ece.webp"
      alt="University of Florida ECE"
      style="filter: brightness(0) invert(1); width: 160mm"
    />
  </div>
</template>

<style scoped>
h4 {
  font-size: 0.9em;
  font-weight: 700;
  font-style: italic;
  padding: 0;
  margin: 0;
}
.id-card {
  padding: 4mm 8mm;
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  align-items: center;
  justify-content: center;
}
.id-card .title {
  font-size: 0.7em;
  font-weight: 600;
  opacity: 0.8;
}
.id-card a.email {
  color: unset;
  font-size: 0.7em;
  font-weight: 500;
  opacity: 0.8;
}
.logos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8mm;
}
.focus-lab-logo {
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  gap: 0.8ch;
}
div.h-div {
  width: 1mm;
  height: 100%;
  background: hsl(0 0% 100% / 0.5);
}
div.v-div {
  width: 100%;
  height: 1mm;
  background: hsl(0 0% 100% / 0.8);
}
</style>
