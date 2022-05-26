<template>
  <div class="order">
    <Header title="订单"/>
    <div class="content">
      <van-tabs color="#ffc400">
        <van-tab v-for="(i,index) of navData" :key="index" :title="i">
         <div v-if="i==='全部'&&store.state.orderListed.length">
           <van-card  v-for="(i,index) in store.state.orderListed" :key="index"
            :num="i.num"
            :price="i.price"
            :title="i.title"
            :thumb="i.pic"
            />
         </div>
         <Blank v-else/>
        </van-tab>
      </van-tabs>

    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from '@/components/Header.vue'
import {useStore} from 'vuex'
import {reactive,toRefs} from 'vue'
import Blank from "../../components/Blank.vue";
export default {
  components: {
    Footer,
    Header,
    Blank,
},
  setup(){
    const store = useStore()
    let data =reactive({
      navData:["全部","交易完成","待付款","待发货","已发货"]
    })
    return {
      ...toRefs(data),
      store,

    }
  }
};
</script>

<style lang='less' scoped>
.order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>