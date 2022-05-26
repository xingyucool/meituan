<template>
  <div>
      <Header :title="address"/>
        <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        />
  </div>
</template>

<script>
import { reactive ,toRefs,onMounted,computed} from 'vue'
import Header from '@/components/Header.vue'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {Toast} from 'vant'
export default {
components: {
    Header,
},
setup(){
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    let data = reactive({
    areaList: {
        province_list: {
          110000: "广东省",
          120000: "浙江省",
        },
        city_list: {
          110100: "广州市",
          110200: "深圳市",
          120100: "杭州市",
          120200: "宁波市",
        },
        county_list: {
          110101: "天河区",
          110102: "海珠区",
          120102: "上城区",
          130102: "下城区",
        }, 
        },
    addressInfo:{},
    })

    const address = computed(()=>{
        return route.query.type==='add'?"地址新增":"地址编辑"
    })

    //如果是编辑地址，就在地址里找到对应id,保存数据
    const init=()=>{
        store.state.userAddress.forEach((item)=> {
            if(item.id===Number(route.query.id)){
                data.addressInfo = item;
            }
        });
    }
    onMounted(()=>{
        init()
    })

    const onSave=(content)=>{
        if(route.query.type==="add"){
            store.commit("ADDADDRESS",content) //新增地址
        }
        else {
            store.commit("CHANGEADDRESS",content)//编辑地址
        }
        Toast("保存成功!")
        
    }

    const onDelete =(content)=>{
        store.commit('DELETEADDRESS',content)
        Toast("删除成功!")
        setTimeout(()=>{
            router.back()
        },1000)
    }

    return {
        ...toRefs(data),
        onSave,
        onDelete,
        address,
    }
}


}
</script>

<style lang='less' scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
/deep/ .van-switch--on {
  background-color: #ffc400;
}
</style>