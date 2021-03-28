<template>
    <div>
        <div class="login">
            <div class="home-chart">
                <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/index-home-pie.png?_v_=20200710_1">
            </div>
            <LoginForm></LoginForm>
        </div>
    </div>
</template>

<script>
    import LoginForm from "./components/LoginForm";
    export default {
        name: "Login",
        components: {
            LoginForm
        }
    }
</script>

<style scoped>
.home-chart{

}
.home-chart img {
    height: 400px;
}
.login{
    padding: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

@media screen and (max-width:1000px){
    .home-chart {
        margin-bottom: 20px;
    }
    .home-chart img {
        height: 100px;
    }
    .login{
        padding: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
