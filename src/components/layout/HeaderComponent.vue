<template>
  <div id="nav">
    <div class="nav-text">EXERCISE DKBMC AI</div>
    <div class="nav-button">
      <router-link to="/login" class="nav-link">
        <el-text class="mx-1" size="large">Login</el-text>
      </router-link>
    </div>
    <div class="nav-button">
      <router-link to="/exercise" class="nav-link">
        <el-text class="mx-1" size="large">Exercise</el-text>
      </router-link>
    </div>
    <div class="nav-button">
      <router-link to="/diet" class="nav-link">
        <el-text class="mx-1" size="large">Diet</el-text>
      </router-link>
    </div>
    <div class="nav-button">
      <router-link to="/personInfo" class="nav-link">
        <el-text class="mx-1" size="large">PersonInfo</el-text>
      </router-link>
    </div>
    <div class="nav-button">
      <router-link to="/hello" class="nav-link">
        <el-text class="mx-1" size="large">Main</el-text>
      </router-link>
    </div>
  </div>
</template>

<style>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00b8ff;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  height: 60px; /* 네비게이션 바의 높이 설정 */
  padding: 0 60px 0 30px; /* 좌우 패딩 설정 */
}

.nav-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding-top: 20px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
}
</style>
<script setup>
</script>