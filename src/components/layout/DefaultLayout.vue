<template>
    <div>
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
</template>

<script>

import Header from '@/components/layout/HeaderComponent.vue';
import Footer from '@/components/layout/FooterComponent.vue';

export default {
  components: {
    Header,
    Footer,
  }
}
</script>
