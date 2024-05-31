<!-- 
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>




<script>
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, BarElement, CategoryScale, LinearScale, LineController, BarController } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, PointElement,LineElement, BarElement, CategoryScale, LinearScale, LineController, BarController)
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: "App",
  components: {

  },
  beforeCreate() {
    console.log("");
    console.log("[App] : [beforeCreate] : [start]");
    console.log("🚀 : 인스턴스 초기화 준비");
    console.log("");
  },

  // 라이프 사이클 : created
  created() {
    console.log("");
    console.log("[App] : [created] : [start]");
    console.log("🚀 : 인스턴스 생성 완료");
    console.log("");
  },

  // 라이프 사이클 : beforeMount
  beforeMount() {
    console.log("");
    console.log("[App] : [beforeMount] : [start]");
    console.log("🚀 : DOM 렌더링 준비");
    console.log("");
  },

  // 라이프 사이클 : mounted
  mounted() {
    console.log("");
    console.log("[App] : [mounted] : [start]");
    console.log("🚀 : DOM 렌더링 완료");
    console.log("");
  },

  // 라이프 사이클 : beforeUpdate
  beforeUpdate() {
    console.log("");
    console.log("[App] : [beforeUpdate] : [start]");
    console.log("🚀 : DOM 상태 및 데이터 변경 시작");
    console.log("");
  },

  // 라이프 사이클 : updated
  updated() {
    console.log("");
    console.log("[App] : [updated] : [start]");
    console.log("🚀 : DOM 상태 및 데이터 변경 완료");
    console.log("");
  },

  // 라이프 사이클 : beforeUnmount
  beforeUnmount() {
    console.log("");
    console.log("[App] : [beforeUnmount] : [start]");
    console.log("🚀 : 인스턴스 마운트 해제 준비");
    console.log("");
  },

  // 라이프 사이클 : unmounted
  unmounted() {
    console.log("");
    console.log("[App] : [unmounted] : [start]");
    console.log("🚀 : 인스턴스 마운트 해제 완료");
    console.log("");
  },

  // 컴포넌트 생성 시 초기 데이터 설정 (리턴 값 지정)
  data() {
    return {
      data: "APP VUE",
      isIndex: true
    };
  },

  // 메소드 정의
  methods: {
    logTest: function () {
      console.log("");
      console.log("[App] : [logTest] : [start]");
      console.log("");

      // 데이터 바인딩 값 변경
      this.data = "App Vue Log Change";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box; height: auto;
  min-height: 100%;
  padding-bottom: 58px;
}
</style>
