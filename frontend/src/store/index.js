import { createStore } from "vuex";
import axios from "axios";
// import { io } from "socket.io-client";
const io = require('socket.io-client');

// state, getters, mutations, actions, modules
const store = createStore({
    state : {
        appUser: {
            socket: null,
            UID: '',
            appUser: {
                UID: '',
                userId: '',
            },
            isLogged: false,
            isHeaderShow: true,

            host: '',
        },
        /* useful function */
        getCookie: function (name) {
            let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value? value[2] : null;
        },
        setCookie: function (name, value, exp) {
            let date = new Date();
            date.setTime(date.getTime() + exp*24*60*60*1000);
            document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
        },
        setError: function(obj, err) {
            for(let key in err) {
                if(Object.prototype.hasOwnProperty.call(obj, key)) { 
                    obj[key] = err[key];
                }
            }
        },
        clearError: function(obj) {
            for(let key in obj) {
                obj[key] = "";
            }
        },
        formatDate(date, type) {
            date = new Date(date);
            let month = date.getMonth() + 1;
            month = month >= 10 ? month : `0${month}`;
            let day = date.getDate();
            day = day >= 10 ? day : `0${day}`;
        
            let hours = date.getHours();
            hours = hours >= 10 ? hours : `0${hours}`;
            let min = date.getMinutes();
            min = min >= 10 ? min : `0${min}`;
            let sec = date.getSeconds();
            sec = sec >= 10 ? sec : `0${sec}`;
            if(type == 'date') {
                return `${date.getFullYear()}-${month}-${day}`; 
            } else if (type == 'date_ko') {
                return `${date.getFullYear()}년 ${month}월 ${day}일`; 
            } else if (type == 'date_2') {
                return `${month}.${day}`; 
            } else {
                return `${date.getFullYear()}-${month}-${day} ${hours}:${min}:${sec}`; 
            }
        }
    },
    getters: {
    },
    mutations: {
        /* 로그인 시 발생하는 function
            개인유저의 socket을 설정한다 
        */
        initSocket(state) {
            let host = state.host;
            try {
                const socket = io("https://localhost:3000");
                console.log("socket:", socket);
                state.socket = socket;
                /* error 반환 */
                socket.emit("notice", "message");
                state.socket.on('/client/connection', (data) => {
                    console.log("data:", data);
                });
                state.socket.on('reply', (data) => {
                    console.log("data:", data);
                });
                state.socket.on('/error', (data) => {
                    alert(data.message);
                    window.location.reload();
                });
            } catch (err) {
                console.log(err);
                alert(err);
            }
        },
        setHeaderShow(state, data) {
            state.isHeaderShow = data;
        },

        setAppUser(state, appUser) {
            if(appUser) {
                state.UID = appUser.UID;
                state.appUser.UID = appUser.UID;
                state.appUser.userId = appUser.userId;
                state.isLogged = true;
            } else {
                state.UID = "";
                state.appUser.UID = "";
                state.appUser.userId = "";
                state.isLogged = false;
            }
        },
    },
});

export default store;