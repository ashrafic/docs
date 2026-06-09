<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const slides = [
  { src: '/filament-translation-suite/assets/screenshots/sys_trans_list.png', alt: 'System Translations List' },
  { src: '/filament-translation-suite/assets/screenshots/content_trans_page.png', alt: 'Content Translation Page' },
  { src: '/filament-translation-suite/assets/screenshots/health_dashboard.png', alt: 'Health Dashboard' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png', alt: 'Translatable Fields Tabs' },
  { src: '/filament-translation-suite/assets/screenshots/translatable_fields_stack.png', alt: 'Translatable Fields Stack' },
  { src: '/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png', alt: 'Translatable Fields Fieldset' },
  { src: '/filament-translation-suite/assets/screenshots/lang_switcher.png', alt: 'Language Switcher' },
  { src: '/filament-translation-suite/assets/screenshots/trans_backup.png', alt: 'Translation Backups' },
]

const current = ref(0)
const transitioning = ref(false)
let timer = null

function goTo(index) {
  if (transitioning.value || index === current.value) return
  transitioning.value = true
  current.value = index
  setTimeout(() => { transitioning.value = false }, 500)
}

function next() {
  goTo((current.value + 1) % slides.length)
}

function prev() {
  goTo((current.value - 1 + slides.length) % slides.length)
}

onMounted(() => {
  timer = setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(timer)
})

// Lightbox
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
  pauseAutoPlay()
}

function closeLightbox() {
  lightboxOpen.value = false
  resumeAutoPlay()
}

function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % slides.length
}

function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + slides.length) % slides.length
}

function pauseAutoPlay() {
  clearInterval(timer)
}

function resumeAutoPlay() {
  timer = setInterval(next, 4000)
}

function onKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') lightboxNext()
  if (e.key === 'ArrowLeft') lightboxPrev()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

watch(lightboxOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="hero-slider">
    <div class="slider-viewport">
      <div
        class="slider-track"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="slide"
        @click="openLightbox(i)"
      >
        <img :src="slide.src" :alt="slide.alt" loading="lazy" />
        <div class="slide-overlay">
          <svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <path d="M11 8v6M8 11h6"/>
          </svg>
        </div>
      </div>
      </div>

      <button class="nav-btn prev" @click="prev" aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button class="nav-btn next" @click="next" aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>

    <div class="dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        :class="['dot', { active: i === current }]"
        @click="goTo(i)"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightboxOpen"
      class="lightbox"
      @click="closeLightbox"
    >
      <div class="lightbox-backdrop" />
      <div class="lightbox-content" @click.stop>
        <img
          :src="slides[lightboxIndex].src"
          :alt="slides[lightboxIndex].alt"
        />
        <p class="lightbox-caption">{{ slides[lightboxIndex].alt }}</p>
      </div>
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <button class="lightbox-nav lightbox-prev" @click.stop="lightboxPrev" aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button class="lightbox-nav lightbox-next" @click.stop="lightboxNext" aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div class="lightbox-counter">
        {{ lightboxIndex + 1 }} / {{ slides.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-slider {
  position: relative;
  width: 100%;
  max-width: 640px;
}

.slider-viewport {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(18, 53, 47, 0.18);
  background: var(--vp-c-bg);
  line-height: 0;
}

.dark .slider-viewport {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  background: var(--vp-c-bg);
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide {
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide img {
  width: 100%;
  height: auto;
  display: block;
}

.slide {
  cursor: zoom-in;
  position: relative;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  transition: background 0.2s ease;
  pointer-events: none;
}

.slide:hover .slide-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.zoom-icon {
  width: 48px;
  height: 48px;
  color: #fff;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide:hover .zoom-icon {
  opacity: 1;
  transform: scale(1);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #12352f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  z-index: 2;
}

.slider-viewport:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: #fff;
}

.nav-btn svg {
  width: 18px;
  height: 18px;
}

.nav-btn.prev { left: 12px; }
.nav-btn.next { right: 12px; }

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-border);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.dot.active {
  background: var(--vp-c-brand-3);
  transform: scale(1.2);
}

.dot:hover {
  background: var(--vp-c-text-3);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(251, 248, 240, 0.4);
  backdrop-filter: blur(2px);
}

.dark .lightbox-backdrop {
  background: rgba(15, 23, 21, 0.4);
}

.lightbox-content {
  position: relative;
  z-index: 1;
  max-width: 90vw;
  max-height: 85vh;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 75vh;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: block;
}

.dark .lightbox-content img {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.lightbox-caption {
  margin: 1rem 0 0;
  color: #171717;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.8;
  text-align: center;
}

.dark .lightbox-caption {
  color: #f5f1e8;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(23, 23, 23, 0.1);
  color: #171717;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(23, 23, 23, 0.2);
}

.lightbox-close svg {
  width: 20px;
  height: 20px;
}

.dark .lightbox-close {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.dark .lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(23, 23, 23, 0.1);
  color: #171717;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-nav:hover {
  background: rgba(23, 23, 23, 0.2);
}

.lightbox-nav svg {
  width: 20px;
  height: 20px;
}

.dark .lightbox-nav {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.dark .lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

.lightbox-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: #171717;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.7;
  background: rgba(23, 23, 23, 0.08);
  padding: 4px 14px;
  border-radius: 20px;
}

.dark .lightbox-counter {
  color: #f5f1e8;
  background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .hero-slider {
    max-width: 100%;
  }
  .slider-viewport {
    border-radius: 12px;
  }
  .nav-btn {
    opacity: 1;
    width: 32px;
    height: 32px;
  }
  .lightbox-content img {
    max-height: 65vh;
  }
  .lightbox-nav {
    width: 40px;
    height: 40px;
  }
  .lightbox-prev { left: 10px; }
  .lightbox-next { right: 10px; }
}
</style>
