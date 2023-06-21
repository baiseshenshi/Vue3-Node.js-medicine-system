<script setup>
import { getCurrentInstance, onBeforeMount, ref } from 'vue';

const { $axios } = getCurrentInstance().appContext.config.globalProperties

const data = ref({})

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

const dataReq = async () => {
    const res = await $axios.get('http://localhost:3000/homepage', {
        params: {
            msg: "hello"
        }
    }).catch(err => console.log(err))

    data.value = res.data
    console.log(data.value);
}

onBeforeMount(() => {
    dataReq()
})

// 对时间格式进行规范
const changeTime = (timeStr) => {
    let yy = ""
    let mm = ""
    let nn = ""
    const timeArr = Array.from(timeStr).filter((item, index, array) => {
        if (item >= "0" && item < "9") {
            if (index < 4) {
                yy += item

            } else if (index < 10) {
                mm += item
            } else if (index < 20) {
                nn += item
            }
        }

    })


    return yy + "-" + mm + "-" + nn
}
</script>

<template>
    <table>
        <caption>登录日志</caption>
        <thead>
            <tr>
                <th>登录账号</th>
                <th>登录IP</th>
                <th>登录城市</th>
                <th>登录时间</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <td>{{ item.no }}</td>
                <td>{{ item.ip }}</td>
                <td>{{ item.location }}</td>
                <td>{{ formatDate(item.createtime) }}</td>
            </tr>
        </tbody>
    </table>
</template>


<style scoped>
table {
    border-collapse: collapse;
    border: 1px solid rgb(230, 230, 230);
    color: #666;
    margin-left: 50px;
}

thead tr {
    background-color: rgb(242, 242, 242);
}

tr,
td,
th {
    border: 1px solid rgb(230, 230, 230);
    color: #666;
}

tr {
    width: 800px;
    height: 40px;
}

td,
th {
    width: 300px;
    text-align: center;
}
</style>