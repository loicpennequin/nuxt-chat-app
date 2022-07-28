<script setup lang="ts">
import { colors } from '@unocss/preset-wind';

const faceColor = (colors?.purple as any)['5'];
const size = 200;
const { x, y } = useMouse();

const pupilX = computed(() => {
  if (import.meta.env.SSR) return 0;

  return ((x.value - window.innerWidth / 2) * (size / 5)) / window.innerWidth;
});

const pupilY = computed(() => {
  if (import.meta.env.SSR) return 0;

  return ((y.value - window.innerHeight / 2) * (size / 5)) / window.innerHeight;
});
</script>

<template>
  <svg :height="size" :width="size">
    <defs>
      <mask id="eye-mask">
        <rect fill="black" :height="size" :width="size" />
        <circle fill="white" :r="size / 8" />
      </mask>

      <mask id="mouth-mask">
        <rect fill="black" :height="size" :width="size" />
        <path
          :d="`M${size * 0.18},${size * 0.6} a1,1 0 0,0 ${size * 0.65},0`"
          fill="white"
        />
      </mask>
    </defs>

    <circle :cx="size / 2" :cy="size / 2" :fill="faceColor" :r="size / 2" />

    <g
      style="mask: url(#eye-mask)"
      :transform="`translate(${size * 0.25} ${size / 3})`"
    >
      <circle fill="white" :r="size / 8" />
      <circle :cx="pupilX" :cy="pupilY" fill="black" r="15" />
    </g>

    <g
      style="mask: url(#eye-mask)"
      :transform="`translate(${size * 0.75} ${size / 3})`"
    >
      <circle fill="white" :r="size / 8" />
      <circle :cx="pupilX" :cy="pupilY" fill="black" r="15" />
    </g>

    <g style="mask: url(#mouth-mask)">
      <path
        :d="`M${size * 0.18},${size * 0.6} a1,1 0 0,0 ${size * 0.65},0`"
        fill="pink"
      />

      <circle :cx="size * 0.4" :cy="size * 0.85" fill="#fad" r="40" />
    </g>
  </svg>
</template>
