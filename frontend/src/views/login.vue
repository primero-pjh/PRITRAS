<template>
    <div id="loginVue" style="width: 100%; height: 100vh; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div id="pritras-header" class="fkB text-center" 
            style="
                font-size: 48px;
                color: white;
                text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; /* 테두리 효과 설정 */
            ">
            PRITRAS
        </div>
        <div style="
            width: 100%;
            max-width: 580px; height: 530px; border: 1px solid rgba(0,0,0,.12);
        " 
            class="bg-white">
            <div style="padding: 55px 69px;">
                <q-input v-model="appUser.userId" label="아이디, 이메일, 전화번호" 
                    clearable class="faSB ft18"
                    hint="카카오 계정이 있다면 하단의 카카오 로그인으로 시도해보세요." />
                <q-input v-model="appUser.password" label="비밀번호" 
                    type="password" clearable class="faSB ft18" 
                    :error="formError.appUser?true:false" :error-message="formError.appUser" />
                
                <q-checkbox v-model="appUser.isRemember" label="자동 로그인" 
                    style="margin: 0 -8px;"
                    class="fkR q-pa-none text-grey-7">
                    <q-tooltip class="faSB">
                        자동 로그인 시 로그인 세션은 30일간 유효합니다.
                    </q-tooltip>
                </q-checkbox>
                
                <div class="q-mt-md">
                    <q-btn label="일반 로그인" class="fkR ft20" color="primary"
                        style="width: 100%; height: 48px;" @click="onLogin" />
                    <q-separator class="q-my-md"></q-separator>
                    <div class="q-mt-md">
                        <q-btn label="카카오 로그인" class="fkR ft20"
                            style="width: 100%; height: 48px; background-color: #fada0a;" />
                    </div>
                </div>
                
                <div id="footer" style="display: flex; align-items: center;" class="q-mt-md text-grey-7">
                    <span class="faSB">회원가입</span>
                    <q-space></q-space>
                    <div style="display: flex; align-items: center;">
                        <span class="faSB">계정 찾기</span>
                        <q-separator vertical class="q-mx-sm"></q-separator>
                        <span class="faSB">비밀번호 찾기</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'loginVue',
    components: {
    },
    data() {
        return {
            appUser: {
                userId: '',
                password: '',
                isRemember: false,
            },
            formError: {

            }
        }
    },
    methods: {
        onLogin() {
            let vm = this;
            vm.$store.commit("setAppUser", {
                UID: 'primero',
                userName: 'PRITRAS',
            });
            vm.$store.commit("initSocket");
            vm.$store.commit("onLoadUsers", '121BA38F');
            vm.$store.commit("onLoadUserOfWorkSpaces");
            vm.$router.push("/");
        },
    },
    mounted() {
        let vm = this;
    },
}
</script>