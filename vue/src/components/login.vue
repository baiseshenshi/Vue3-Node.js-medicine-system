<script setup>
import Mask from './UI/Mask.vue';
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

// 获取axios
const currentInstance = getCurrentInstance()
const { $axios } = currentInstance.appContext.config.globalProperties

//获取路由
const router = useRouter()

const username = ref()
const password = ref()

function formatDate(time,format='YY-MM-DD hh:mm:ss'){
	const date = new Date(time);

	const year = date.getFullYear(),
		month = date.getMonth()+1,//月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	const preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		return '0'+index;
	});

	const newTime = format.replace(/YY/g,year)
						.replace(/MM/g,preArr[month]||month)
						.replace(/DD/g,preArr[day]||day)
						.replace(/hh/g,preArr[hour]||hour)
						.replace(/mm/g,preArr[min]||min)
						.replace(/ss/g,preArr[sec]||sec);

	return newTime;			
}

// 点击后发送请求
const go = async (username, password) => {
    
    if (!username || !password) {
        alert("用户名或密码未输入")
        return
    }
    const msg = {};
    await fetch('http://ip-api.com/json')
        .then(res => res.json())
        .then(res => {
            msg.ip = res.query
            if (res.city === "Nanchang") {
                msg.city = "江西省" + "南昌市"
            }
            msg.time = formatDate(Date.now())
        })
        .catch(err => console.log(err))

    $axios.post('http://localhost:3000/homepage/loginlog',{
        loginLog:{
            no: username,
            ip: msg.ip,
            createtime: msg.time,
            location: msg.city
        }
    })

    username = username.split(" ").join("")
    password = password.split(" ").join("")

    try {
        $axios.get('http://localhost:3000', {
            params: {
                username: username,
                password: password
            }
        })
            .then(res => {
                if (res.data === 444) {
                    alert('账号密码错误')
                    throw Error
                }
                if (res.data.key === '666') {
                    // 若没有session,则存储session
                    if (!sessionStorage.getItem('key')) {
                        sessionStorage.setItem('key', res.data.key)
                        sessionStorage.setItem('username', res.data.username)
                    }
                    router.push('/prime/master')
                }
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <!-- 遮罩层 -->
    <Mask :is-show="true"></Mask>
    <div class="sumbit">
        <form action="#">
            <div class="input-box">
                <div class="label"><span>用户名</span></div>
                <input type="text" v-model="username">
            </div>
            <div class="input-box">
                <div class="label"><span>密码</span></div>
                <input style="margin-left: 20px;" type="password" v-model="password">
            </div>

            <button type="submit" @click.prevent="go(username, password)">登录</button>
        </form>
    </div>
</template>

<style scoped>
.sumbit {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 200px auto;
    width: 400px;
    height: 300px;
    background-color: #E8E3EC;
    border-radius: 30px;
    z-index: 9999;
}

form .input-box {
    display: flex;
    align-items: center;
    width: 320px;
    height: 100px;
}

.label span {
    font-size: 22px;
    padding: 10px;
}

div input {
    font-size: 20px;
    width: 210px;
    height: 15px;
    background-color: #F5FFFA;
    border-radius: 10px;
    padding: 10px;
}

button {
    background-color: #DCB5D4;
    border: none;
    width: 100px;
    height: 40px;
    margin-left: 95px;
    border-radius: 10px;
    font-size: 22px;
}
</style>