<script setup lang="ts">
import PanelHeader from "../components/PanelHeader.vue";
import Timeline from "../components/Timeline.vue";
import TimelineItem from "../components/TimelineItem.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { withBase } from "lib/paths";

// Accent sweeps from lime green (top, oldest) to cyan / light blue (bottom),
// so each item's dot + date is a sample of the gradient at its position.
const N = 8;
const accentAt = (i: number) => `hsl(${0 + 270 * (i / (N - 1))} 80% 80%)`;
</script>

<template>
  <PanelHeader style="margin: 0">Biological Inspiration</PanelHeader>
  <div class="inspiration">
    <img :src="withBase('inspiration/eagle.webp')" />
    <img :src="withBase('inspiration/owl.webp')" />
    <img :src="withBase('inspiration/bat.webp')" />
    <img :src="withBase('inspiration/cat.webp')" />
  </div>

  <PanelHeader style="margin: 10mm 0">
    A Decade of Foveated Sensing
  </PanelHeader>

  <Timeline style="padding-bottom: 4mm; margin-bottom: 8mm">
    <TimelineItem date="Jun 2018" venue="RSS" :accent="accentAt(0)">
      <h4>Directionally-controlled TOF ranging</h4>
      <p>
        A single MEMS mirror steers a time-of-flight beam to range where it
        matters.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2018-RSS-FoveatedToF.webp')"
          alt="MEMS micromirror chip"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Apr 2020" venue="ICCP" :accent="accentAt(1)">
      <h4>FoveaCam: MEMS mirror-enabled foveating camera</h4>
      <p>
        A wide peripheral with a MEMS-steered telephoto that foveates in under
        1ms.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2020-ICCP-FoveaCam.webp')"
          alt="Foveated camera"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Oct 2020" venue="IJRR" :accent="accentAt(2)">
      <h4>Adaptive fovea for scanning depth sensors</h4>
      <p>
        Extending adaptive fovea to scanning LiDAR sensors for efficient 3D
        sensing.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2020-IJRR-Adaptive.webp')"
          alt="Foveated depth sensor"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Mar 2021" venue="PAMI" :accent="accentAt(3)">
      <h4>Fast foveating cameras for dense adaptive resolution</h4>
      <p>
        Fast foveation yields dense, adaptive spatial resolution from a small
        camera.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2021-PAMI-FoveaCam.webp')"
          alt="Region-of-interest depth result"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Oct 2021" venue="ICCV" :accent="accentAt(4)">
      <h4>SaccadeCam: adaptive visual attention</h4>
      <p>
        Saccade-like attention learns where to look, improving monocular depth
        quality.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2021-ICCV-SaccadeCam.webp')"
          alt="Adaptive depth map"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Jun 2023" venue="CVPR" :accent="accentAt(5)">
      <h4>Energy-efficient adaptive 3D sensing</h4>
      <p>
        Adaptive 3D sensing that spends energy only on informative regions of a
        scene.
      </p>
      <template #supplementary>
        <img
          class="thumb"
          :src="withBase('history/2023-CVPR-SLM-3D.webp')"
          alt="Foveated LiDAR point cloud"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="Oct 2024" venue="IROS" :accent="accentAt(6)">
      <h4>
        FoveaCam++: Systems-level Advances for Long-range Multi-object Tracking
      </h4>
      <template #supplementary>
        <FontAwesomeIcon
          class="see-right"
          :icon="faArrowRight"
          :style="{ color: accentAt(6) }"
        />
      </template>
    </TimelineItem>

    <TimelineItem date="May 2026" venue="ICCP" :accent="accentAt(7)">
      <h4>FoveaCam Duo: Foveated Stereo for Standoff Depth Sensing</h4>
      <template #supplementary>
        <FontAwesomeIcon
          class="see-right"
          :icon="faArrowRight"
          :style="{ color: accentAt(7) }"
        />
      </template>
    </TimelineItem>
  </Timeline>
</template>

<style scoped>
.inspiration {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8mm 0;
}
.inspiration img {
  width: 22%;
  height: auto;
  border-radius: 16mm;
}
/* The eagle eye image is a fun nod to the biological inspiration, but it's
   also a convenient way to fill the space and balance the layout. */
.eagle-eye {
  height: 80mm;
  border-radius: 50%;
  margin-top: -20mm;
  margin-left: 16mm;
}
/* Supplementary-slot content (right-hand side of a node). */
.thumb {
  flex: none;
  width: 7.2em;
  height: 3.8em;
  object-fit: cover;
  border-radius: 8mm;
  background: hsl(0 0% 100% / 0.06);
  margin-left: -4mm;
}
.see-right {
  flex: none;
  align-self: center;
  font-size: 1.4em;
}
</style>
