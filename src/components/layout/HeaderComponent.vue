<template>
  <header class="nav">
    <div class="nav-left">
      <router-link to="/dashboard" class="brand">Life Quant</router-link>
    </div>

    <nav class="nav-menu">
      <router-link to="/dashboard" class="nav-link" active-class="active">대시보드</router-link>

      <div class="group">
        <router-link to="/health/exercise" class="nav-link" active-class="active">운동</router-link>
        <router-link to="/health/diet" class="nav-link" active-class="active">식단</router-link>
        <router-link to="/health/ai" class="nav-link" active-class="active">AI 코치</router-link>
      </div>

      <div class="group">
        <router-link to="/investment/index" class="nav-link" active-class="active">투자지수</router-link>
        <router-link to="/investment/analysis" class="nav-link" active-class="active">지수분석</router-link>
      </div>

      <router-link to="/reading/review" class="nav-link" active-class="active">독서</router-link>
      <router-link to="/self/insight" class="nav-link" active-class="active">인사이트</router-link>
      <router-link to="/profile" class="nav-link" active-class="active">내정보</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.nav {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: #002060;
  color: #fff;
}

.brand {
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.group {
  display: flex;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 6px 8px;
  border-radius: 8px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.12);
}

.active {
  background: rgba(255, 255, 255, 0.18);
}
</style>
