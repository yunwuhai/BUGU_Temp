<template>
  <div>
    <transition mode="out-in"
                appear
                appear-active-class="animate__animated animate__fadeIn"
                :duration="500"
                enter-active-class="animate__animated animate__fadeIn">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  watch: {
  },
};
</script>

<style>
</style>
