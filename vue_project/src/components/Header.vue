<template>
  <div class="header">
    <van-icon name="arrow-left" class="icon" @click="$router.go(-1)"/>
    <div>{{title}}</div> 
    <div class="edit" v-if="edit" @click="editClick">{{store.state.edit?"编辑":"完成"}}</div> 
  </div>
</template>

<script>
import emitter from '@/common/js/eventbus.js' 
import {Toast} from 'vant'
import {useStore} from 'vuex'
export default {
    props:['title','edit'],
    setup() {
      const store = useStore()
      //编辑按钮
      const editClick=()=>{
        if(store.state.cartList.length){ //订单列表不空
            store.commit('EDIT')
            emitter.emit('edit') //触发了edit事件
        }
        else {
          Toast.fail('购物车空空如也')
        }
      }
      return {
        editClick,
        store,
      }
    }

}
</script>

<style lang='less' scoped>
.header {
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  .edit {
    font-size: 16px;
    position: absolute;
    right: 15px;
    font-weight: normal;
  }
  .icon {
    position: absolute;
    left: 10px;
  }
}
</style>