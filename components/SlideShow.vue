<template>
  <div class="ss-wrapper">
    <div class="smartphone">
      <div class="smartphone--inner">
        <vueper-slides
          :arrows="false"
          :bullets="false"
          :touchable="false"
          fixed-height="369px"
          :autoplay="true"
        >
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
            :content="slide.content"
          />
        </vueper-slides>
      </div>
    </div>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
        {
          content: '<div style="height: 100%"></div>',
          image: require('@/static/img/shopping-list-screenshot.png'),
        },
        {
          content: '<div style="height: 100%"></div>',
          image: require('@/static/img/shopping-list-screenshot2.png'),
        },
      ],
    }
  },
}
</script>
<style lang="scss">
.ss-wrapper {
  width: 100%;
  .smartphone {
    background: url(/img/smartphone.png);
    background-position: center;
    background-size: cover;
    width: 330px;
    height: 454px;
    margin: 0 auto;
    position: relative;
    &--inner {
      margin: 2% 33% 25% 12%;
      margin: 0;
      position: absolute;
      left: 11%;
      top: 4px;
      right: 32%;
      overflow: hidden;
      border-radius: 0.8rem;
      height: 369px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
