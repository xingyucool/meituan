<template>
   <div class="create_order">
       <Header title="生成订单页面"/>
       <van-contact-card 
        type="edit" 
        :tel="tel" 
        :name="name" 
        @click="onEdit" />
        <div class="content">
            <div v-for="(i,index) of store.state.orderList" :key="index">
                <van-card
                 :num="i.num"
                 :price="i.price"
                 :title="i.title"
                 :thumb="i.pic"
                 />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>{{allPrice}}</span>
            </div>
            <van-button 
                class= "btn-pay" 
                type="primary" 
                @click="handleCreateOrder" 
                color="#ffc400"
                block
                >
                生成订单
            </van-button>
            
        </div>
   </div>
</template>

<script>
import {toRefs,reactive,onMounted} from 'vue'
import {useStore} from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import Header from '@/components/Header'
import {Dialog} from 'vant'
export default {
    components: {
        Header,
    },
        setup(){
            const store = useStore()
            const router = useRouter()
             const route = useRoute()
            let data=reactive({
                name:'周星宇',
                tel:'123456789',
                allPrice:0,
            })
            
            const onEdit=()=>{
                router.push('/address')
            }
            //用户信息初始化
            const initUser=()=>{
                store.state.userAddress.forEach((item)=>{
                    if(item.isDefault){
                        data.name=item.name;
                        data.tel=item.tel;
                    }
                })
            }
            //生成订单
            const handleCreateOrder=()=>{
                Dialog.alert({
                    title:'提示',
                    message:"恭喜！您的订单已经完成!"
                }).then(()=>{
                 let newList=store.state.cartList.filter((item)=>{
                     return !route.query.list.includes(item.id+"");
                 }) 
                 store.commit('DELETE',newList)  //newList即选中但没有结算，即仍在购物车的商品
                 store.commit('UPDATEORDER',)
                 router.push('/order')
                })
                
            }
            //总价初始化
            const initPrice=()=>{
                let price =0
                if(store.state.orderList.length){
                    store.state.orderList.forEach(item => {
                        price +=item.num*item.price
                    });
                    data.allPrice=price;
                }
            }
            onMounted(() => {
                initPrice()
                initUser()
            })

            return {
                ...toRefs(data),
                onEdit,
                store,
                handleCreateOrder,


            }
        }
    
}
</script>

<style lang='less' scoped>
.create_order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>