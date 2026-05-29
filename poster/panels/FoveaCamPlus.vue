<script setup lang="ts">
import PanelHeader from "../components/PanelHeader.vue";
import GridBox from "../components/GridBox.vue";
import OpticalDiagram from "../assets/optical-diagram.svg";
import Synchronization from "../assets/synchornization.svg";
import TrackingResults from "../assets/tracking-results.svg";
import Stabilization from "../assets/stabilization.svg";
import Pano from "../assets/FoveaCamPlusPano.svg";
</script>

<template>
  <!-- Grid: title spans cols 1–2 (row 1); col 3 spans both rows (taller, clears
       the title); cols 1–2 sit below it. Each column is its own 2-row sub-grid
       whose row heights are set per column below. -->
  <div class="pgrid">
    <PanelHeader class="g-title">
      FoveaCam++: Systems-level Advances for
      <br />
      Long-range Multi-object High-resolution Tracking
      <template #attribution>
        <span class="venue">IROS 2024</span>
        <div class="h-div"></div>
        <span class="authors">Yuxuan Zhang, <u>Sanjeev J. Koppal</u></span>
      </template>
    </PanelHeader>

    <!-- 3-view panorama: spans cols 1–2 directly under the title. -->
    <div class="cell pano">
      <figure class="fig">
        <Pano
          class="svg"
          role="img"
          aria-label="Wide-angle context with left/right MEMS-zoom foveal views"
        />
      </figure>
    </div>

    <div class="g-row">
      <div class="cell abstract">
        <h4>Abstract</h4>
        <p>
          UAVs and other fast moving robots needs to keep track of distant
          objects. Conventional zoom cameras commit to a particular viewpoint,
          and carrying multiple zoom cameras for multi-object tracking is not
          feasible for power limited robotic systems. We present a dual camera
          setup that allows tracking of multiple targets at nearly 1km distance
          with high-resolution. We show multi-object tracking and stabilization
          in real world scenarios.
        </p>
      </div>
      <GridBox title="Optical Diagram" accent="var(--blue-2)">
        <figure class="fig">
          <OpticalDiagram
            class="svg"
            role="img"
            aria-label="FoveaCam++ optical diagram"
          />
        </figure>
      </GridBox>
      <GridBox title="Synchronization" accent="var(--blue-2)">
        <figure class="fig">
          <Synchronization
            class="svg"
            role="img"
            aria-label="Synchronization diagram"
          />
        </figure>
      </GridBox>
    </div>

    <div class="gcol gcol-3">
      <GridBox title="Multi-Target Tracking" accent="var(--blue-2)">
        <figure class="fig">
          <TrackingResults
            class="svg"
            role="img"
            aria-label="Tracking results"
          />
        </figure>
      </GridBox>
      <GridBox title="Camera Stabilization" accent="var(--blue-2)">
        <figure class="fig">
          <Stabilization
            class="svg"
            role="img"
            aria-label="Stabilization diagram"
          />
        </figure>
      </GridBox>
    </div>
  </div>
</template>

<!-- Shared panel scaffold (grid, cells, stats, figures). -->
<style scoped src="./panel.css"></style>

<!-- FoveaCam++ specifics: a pano row under the title (spanning cols 1–2),
     per-column row heights, and bullets/stats. -->
<style scoped>
/* Three rows now: title · pano (cols 1–2) · the grid boxes. */
.pgrid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto 1fr;
}
.pano {
  grid-column: 1 / 3;
  grid-row: 2;
}
.g-row {
  grid-column: 1 / 3;
  grid-row: 3;
  display: grid;
  grid-template-columns: 7fr 4fr 4fr;
  gap: 12mm;
  min-width: 0;
  min-height: 0;
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
.gcol-3 {
  grid-row: 1 / 4; /* spans title + pano + columns → tallest */
  grid-template-rows: 0.9fr 1fr;
}
</style>
