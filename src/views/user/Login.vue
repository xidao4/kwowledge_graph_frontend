<template>
    <div>
        <div class="login">
            <div class="home-chart">
                <img src="http://i3.sinaimg.cn/gm/j/n/2008-12-30/U1850P115T9D289891F364DT20081230185442_c.jpg">
                <div class="function">
                    <h2>搜索</h2>
                    <h2>问答</h2>
                </div>
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
    position: absolute;
    top: 70px;
    left: 160px;
}
.home-chart img {
    height: 130px;
}
.login{
    padding: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-left: 30%;
}
h2{
    font-size: 36px;
    font-weight: bold;
    font-family: STFangsong;
}
.function{
    margin-left: 35%;
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
