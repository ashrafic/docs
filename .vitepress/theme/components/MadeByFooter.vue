<script setup lang="ts">
import { useSidebar } from 'vitepress/theme'
const { hasSidebar } = useSidebar()
</script>

<template>
  <div class="made-by-footer" :class="{ 'has-sidebar': hasSidebar }">
    <p class="made-by-label">Made By</p>
    <div class="made-by-logo">
      <a href="https://ashraficlabs.com" target="_blank">
        <img src="https://ashraficlabs.com/brand/ashrafic-labs-logo-horizontal-primary.svg" alt="Ashrafic Labs" width="280" />
      </a>
    </div>
    <div class="made-by-desc">
      <p>
        Laravel & Filament tools built for developers who ship. This is a commercial product. If you need help, we respond fast.
      </p>
    </div>
    <div class="made-by-links">
      <a href="https://ashraficlabs.com" target="_blank">🌐 ashraficlabs.com</a>
      <a href="mailto:hello@ashraficlabs.com">✉️ hello@ashraficlabs.com</a>
    </div>
  </div>
</template>


