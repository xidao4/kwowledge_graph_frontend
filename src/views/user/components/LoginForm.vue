<template>
    <div class="card">
        <div class="title">
            登录 SuperCOIN
        </div>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" @submit="handleSubmit">
            <a-form-item label="账号" style="display: flex; align-items: center">
                <a-input style="border-radius: 20px; height: 40px"
                         v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
                         placeholder="请输入账号"
                         :max-length="15"
                />
            </a-form-item>

            <a-form-item label="密码" style="display: flex; align-items: center">
                <a-input type="password"
                         style="border-radius: 20px; height: 40px"
                         v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
                         placeholder="请输入密码"
                         :max-length="15"
                />
            </a-form-item>

            <div style="text-align: center; width: 100%">
                <button class="pan-btn pink-btn">
                    登录
                </button>
            </div>
        </a-form>
    </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import { mapActions } from 'vuex';
    export default {
        name: "Login",
        components: {AFormItem},
        data(){
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
            }
        },
        methods: {
            ...mapActions({
                loginAct: 'login'
            }),
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.loginAct(values);
                        console.log('Received values of form: ', values);
                    }
                });
            },
        },
    }
</script>

<style scoped lang="scss">
.card{
    padding: 30px;
    min-width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-image: none;
}
.card .title {
    font-size: 30px;
    color: rgba(0, 0, 0, .85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 500;
    position: relative;
    top: 2px;
    margin-bottom: 50px;
}
.ant-form label {
    font-size: 25px;
}
.ant-btn{
    font-size: 16px;
}
.margin-bottom-s {
    margin-bottom: 20px;
}
.margin-bottom-m {
    margin-bottom: 35px;
}
.pan-btn {
    font-size: 14px;
    color: #fff;
    padding: 10px 36px;
    border-radius: 20px;
    border: none;
    outline: none;
    transition: 600ms ease all;
    position: relative;
    display: inline-block;

&:hover {
     background: #fff;

&:before,
&:after {
     width: 100%;
     transition: 600ms ease all;
 }
}

&:before,
&:after {
     content: '';
     position: absolute;
     top: 0;
     right: 0;
     height: 2px;
     width: 0;
     transition: 400ms ease all;
 }

&::after {
     right: inherit;
     top: inherit;
     left: 0;
     bottom: 0;
 }
}
@mixin colorBtn($color) {
    background: $color;

    &:hover {
        color: $color;

        &:before,
        &:after {
            background: $color;
        }
    }
}
.pink-btn {
    @include colorBtn(#E65D6E)
}
</style>
