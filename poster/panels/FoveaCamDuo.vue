<script setup lang="ts">
import PanelHeader from "../components/PanelHeader.vue";
import GridBox from "../components/GridBox.vue";
// Figures
import Localization from "../assets/localization.svg";
import StereoTracking from "../assets/stereo-tracking.svg";
import Crypsis from "../assets/crypsis.svg";
</script>

<template>
  <!-- Grid: title spans cols 1–2 (row 1); col 3 spans both rows (taller, clears
       the title); cols 1–2 sit below it. Each column is its own 2-row sub-grid
       whose row heights are set per column below. -->
  <div class="pgrid">
    <PanelHeader class="g-title">
      FoveaCam Duo: Foveated Stereo for Standoff Depth Sensing
      <template #attribution>
        <span class="venue">ICCP 2026</span>
        <div class="h-div"></div>
        <span class="authors"
          >Yuxuan Zhang, Jacob Carter, Hannah Kirkland, Michael Tomadakis, Noah
          Ralph, <u>Sanjeev J. Koppal</u></span
        >
      </template>
    </PanelHeader>

    <div class="duo-left">
      <div class="cell duo-hero">
        <figure class="fig">
          <img
            src="/duo/device.webp"
            alt="Three-camera FoveaCam Duo assembly"
          />
        </figure>
        <figure class="fig">
          <img src="/duo/cross-section.webp" alt="FoveaCam Duo cross section" />
        </figure>
      </div>
      <div class="duo-bottom">
        <div class="cell abstract">
          <h4>Abstract</h4>
          <p>
            Robust depth perception is fundamental to autonomous navigation,
            manipulation, and scene understanding. Here we apply the benefits of
            foveation to depth perception with FoveaCam Duo: a passive stereo
            system inspired by biological foveation and crypsis. It uses a pair
            of high-resolution telephoto cameras steered by fast MEMS mirrors to
            produce high quality, dense depth at any designated region of
            interest.
          </p>
        </div>
        <div class="cell trajectory">
          <figure class="fig">
            <Localization
              class="svg"
              role="img"
              aria-label="Target localization experiments"
            />
          </figure>
        </div>
      </div>
    </div>

    <div class="gcol gcol-3">
      <GridBox title="Stereo Tracking" accent="var(--blue-2)">
        <figure class="fig">
          <StereoTracking
            class="svg"
            role="img"
            aria-label="Stereo tracking results"
            style="transform: scale(0.96) translateY(1%) translateX(-0.2%)"
          />
        </figure>
      </GridBox>
      <GridBox title="Crypsis Analysis" accent="var(--blue-2)">
        <figure class="fig">
          <Crypsis
            class="svg"
            role="img"
            aria-label="Crypsis analysis results"
            style="transform: scale(0.94) translateY(2%) translateX(-0.5%)"
          />
        </figure>
      </GridBox>
    </div>
  </div>
</template>

<!-- Shared panel scaffold (grid, cells, stats, figures). -->
<style scoped src="./panel.css"></style>

<!-- FoveaCam Duo specifics: per-column row heights, specs grid, result note,
     and inline-SVG sizing. -->
<style scoped>
.pgrid {
  grid-template-columns: 1fr 1fr 0.8fr;
}
.duo-left {
  grid-column: 1 / 3;
  grid-row: 2;
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 12mm;
  min-width: 0;
  min-height: 0;
}
.duo-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12mm;
  min-width: 0;
  min-height: 0;
}
.duo-bottom {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 10mm;
  min-width: 0;
  min-height: 0;
}
.gcol-3 {
  grid-template-rows: 1fr 0.94fr;
}
.abstract {
  padding: 2mm 1mm 0;
}
.abstract h4 {
  font-size: 0.8em;
  margin: -4mm 0 4mm;
}
.abstract p {
  margin: 0;
  font-size: 0.6em;
  line-height: 1.3;
}
</style>
