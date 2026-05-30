<script setup lang="ts">
import Poster from "framework/src/Poster.vue";
import LayoutHeader from "poster/layout/Header.vue";
import LayoutBody from "poster/layout/Body.vue";
import History from "poster/panels/History.vue";
import FoveaCamPlus from "poster/panels/FoveaCamPlus.vue";
import FoveaCamDuo from "poster/panels/FoveaCamDuo.vue";
import PosterHeader from "poster/panels/PosterHeader.vue";
</script>

<template>
  <Poster>
    <!-- Band heights / padding in mm; body fills the remainder (1fr). -->
    <LayoutHeader :height="100" :pad="16">
      <PosterHeader />
    </LayoutHeader>
    <LayoutBody>
      <template #history>
        <History />
      </template>
      <template #foveacam-plus>
        <FoveaCamPlus />
      </template>
      <template #foveacam-duo>
        <FoveaCamDuo />
      </template>
    </LayoutBody>
  </Poster>
</template>
