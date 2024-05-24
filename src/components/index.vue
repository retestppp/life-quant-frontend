<template>
  <div class="hello">
    <div class="left">
      <img class="homebackImg" src="../../src/assets/homebackground.png" />
    </div>
    <div class="right">
      <h1>{{ msg }}</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
          >vue-cli documentation</a
        >.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li>
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
            target="_blank"
            rel="noopener"
            >babel</a
          >
        </li>
        <li>
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
            target="_blank"
            rel="noopener"
            >eslint</a
          >
        </li>
      </ul>
      <h3>내가 만든 것들</h3>
      <ul>
        <router-link to="/hello">hello </router-link>
        <router-link to="/login">login </router-link>
        <router-link to="/exercise">exercise </router-link>
        <router-link to="/diet">diet</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// import loginComponent from "@/views/common/LoginPage.vue";
// import helloComponent from "@/components/HelloWorld.vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    // loginComponent,
    // helloComponent,
  },  
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.homebackImg {
  width: 100%;
  height: 100%;
}
.hello {
  display: flex;
}
.left {
  width: 70%;
}
.right {
  width: 30%;
}
</style>
