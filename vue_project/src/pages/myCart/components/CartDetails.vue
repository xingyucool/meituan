<template>
   <div class="cartDetails">
       <!--商品列表-->
       <div class="content">
           <van-checkbox-group v-model="result" @change="groupChange">
            <div v-for="(i,index) in store.state.cartList" :key="index">
                <FoodAdd :item="i" 
                    :showCheckbox="true"
                    :onChange="onChange"
                    />
            </div>
           </van-checkbox-group>
       </div>

       <!--结算列表-->
       <van-submit-bar 
        :price="allPrice" 
         button-text="提交订单" 
        @submit="onSubmit" class="submit-all"
        button-color="#ffc400"
        v-if="isDelete"
       >
        <van-checkbox v-model="checked" checked-color="#ffc400" @click="choseAll">
            全选
        </van-checkbox>
        <template #tip>
        你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template>
       </van-submit-bar>

        <!--删除-->
       <div class="buy" v-else>
           <div class="left">
               <van-checkbox
                 v-model="checked"
                 checked-color="#ffc400"
                 @click="choseAll"
                 >
                 全选</van-checkbox>
           </div>
            <div class="delete" @click="deleteClick">删除</div>
       </div>
   </div>
</template>

<script>
import {toRefs,reactive, onMounted,computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import FoodAdd from '@/components/FoodAdd'
import { Toast } from 'vant'
import emitter from '@/common/js/eventbus.js' 
export default {
  components: {
      FoodAdd,
  },
  props:['changeShow'],
    setup(props){
        const store = useStore()
        const router = useRouter()
        let data = reactive({
            result:[],//哪些商品勾选
            checked:true,//订单提交栏的全选框
            isDelete:true,
        });
        

        //商品全选中
        const init=()=>{
            data.result=store.state.cartList.map((item)=>
                item.id
            )
        }
        onMounted(()=>{
            init()
        })
        //商品个数同步
        const onChange=(value,detail)=>{
            store.state.cartList.map((item)=>{
                if(item.id===detail.name){
                    item.num=value;
                }
            })
        }  

        //更新数据
        const update = (type)=>{
            return store.state.cartList.filter((item)=>{
              return type===2
                ?data.result.includes(item.id)
                :!data.result.includes(item.id)

            })
        }
        //结算按钮
        const onSubmit=()=>{
            if(data.result.length!==0){
                store.commit('PAY',update(2))
                router.push({
                    path:'/createorder',
                    query: {
                        list:data.result //选中的商品id，路由传参
                    }
                })
            }
            else{
                Toast.fail('请选择要结算的商品')
            }
        }

        //全选
        const choseAll=()=>{
            if(data.result.length!==store.state.cartList.length){
                init()
            }
            else {
                data.result=[]
            }
        }
        //每个复选框点击事件触发
        const groupChange=(result)=>{
            //console.log(result)
            //选中就把商品id存到result
            if(result.length===store.state.cartList.length){
                data.checked=true;
            }
            else {
                data.checked=false;
            }
            data.result=result;
        }

        const allPrice=computed(()=>{
            let countList=store.state.cartList.filter((item)=>
                data.result.includes(item.id)
            );
            let sum = 0;
            countList.forEach((item)=>{
                //console.log(item.price,item.num,item.price*item.num)
                sum += item.price *item.num;
            })
            return sum*100;
        })

        //监听编辑的点击
        emitter.on('edit',()=>{
            data.isDelete=!data.isDelete
        })
        
    
        //删除按钮
        const deleteClick=()=>{
            if(data.result.length){
                //更新删除后购物车数据
                store.commit('DELETE',update(1))
                
                //删除后的result为空
                data.result = []
                
                //购物车无数据时展示兜底样式
                if(store.state.cartList.length===0){
                        props.changeShow();
                        store.commit('EDIT','delete')
                }

            }
            else {
                Toast.fail('请选择要删除的商品')
            }
        }

        return {
            ...toRefs(data),
            store,
            onChange,
            onSubmit,
            choseAll,
            groupChange,
            allPrice,
            update,
            deleteClick,
        }
    }
}
</script>

<style lang='less' scoped>
.cartDetails {
  font-size: 14px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 20px 20px 55px;
  .submit-all {
    position: fixed;
    bottom: 48px;
  }

  .buy {
    position: fixed;
    bottom: 48px;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    height: 50px;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
    }
    .delete {
      color: #fff;
      background-color: #ffc400;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 110px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .content {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
  }
}
</style>