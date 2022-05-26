<template>
  <div class="food_list" v-if="index === 0">
  <van-tree-select
   height="55vw"
   :main-active-index="active"
   :items="items"
   @click-nav="navClick"
  >
  <template #content>
   <div v-for="(i,index) in subItem" :key="index" class="item_bg" >
    <FoodAdd 
    :item='i' 
    :showAdd="true"
    :addClick="addClick"
    :onChange="onChange"
    
    />
   </div>
   
  </template>
</van-tree-select>
  </div>

<div v-else>{{ foodData.content }}</div>
</template>

<script>
import { reactive ,toRefs} from 'vue'
import FoodAdd from '@/components/FoodAdd'
export default {
    props:['foodData','index'],
    components: {
        FoodAdd,
    },
    setup(props){
        console.log(props.foodData)
        let data = reactive({
            active:0,
            items: [{ text: '分组 1' }, { text: '分组 2' }],//存放套餐名
            subItem:[],
        })
        //数据初始化
        const init=()=>{
            let newList = [];
            props.foodData.items?.map((i,index)=>{
                //console.log(i.text)  
                newList.push({text:i.text})//遍历数组每个对象，把名字加进数组
                if(data.active===index){   //看当前选中tabs的哪一项
                      data.subItem=i.children //把如热销套餐数据放入subItem
                }
            })
            data.items=newList;//设置套餐名数组
        }
        init()
        
        //点击左侧导航
        const navClick = (i) => {
            //console.log(i)
            data.active = i //设置选中某项
            init()
        };

        // 切换步进器
    const addClick = (i) => {
      data.subItem.forEach((item) => {
        if (item.id === i) {
          item.add = false;
          item.num += 1;
        }
      });
    };

      // 步进器增加触发事件
    const onChange = (value, detail) => {
      data.subItem.forEach((item) => {
        if (item.id === detail.name) {
          item.num = value;
        }
      });
    };
    return {
            ...toRefs(data),
            navClick,
            onChange,
            addClick,
        }
    }

      
    }


</script>

<style lang='less' scoped>
.food_list {
  margin-top: 20px;
  .item_bg {
    padding: 10px;
  }
}

/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>