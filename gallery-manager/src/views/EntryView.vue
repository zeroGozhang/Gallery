<template>
  <div class="entry-view">
    <img :src="jiankeImg" alt="jianke.png">
  </div>
</template>

<script>
import jianke from '@/assets/jianke.png';

export default {
  data() {
    return {
      jiankeImg: jianke,
    };
  },
};
</script>


<style lang="less">
  .entry-view {
    img {
      text-align: center;
      width: 80%;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
</style>
