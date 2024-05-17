<template>
    <div>
        <router-link to="/hello">hello </router-link>
        <h1>Login</h1> 
        <form @submit="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            // Add your login logic here
            // You can make an API call to authenticate the user
            // or perform any other necessary actions
            if (this.user_id === '') {
                alert('ID를 입력하세요.')
                return
            }

            if (this.user_pw === '') {
                alert('비밀번호를 입력하세요.')
                return
            }

            alert('로그인 되었습니다.')
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>