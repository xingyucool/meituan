import {createStore} from 'vuex'
export default createStore({
    state:{
        cartList:[],//购物车列表数据
        orderList:[],//订单列表数据
        orderListed:[],//生成订单后列表数据
        edit:true,//展示顶部编辑状态
        userAddress:[
        {
        id: 1001,
        name: '周星宇',
        tel: '18006871845',
        province: '浙江省',
        city: '温州市',
        county: '瓯海区',
        addressDetail: 'asd',
        isDefault: true,
        areaCode: '110101',
        },
        {
            id: 1002,
            name: '宇哥',
            tel: '18006871845',
            province: '浙江省',
            city: '温州市',
            county: '瓯海区',
            addressDetail: 'asd',
            isDefault: false,
            areaCode: '110101',
          },
        ],

    },
    mutations:{
        //添加购物车
        ADDCART(state,value){
            state.cartList=value
            //console.log('m',state.cartList)
        },
        //结算按钮
        PAY(state,value){
            state.orderList=value 
            
        },
        //删除
        DELETE(state,value){
            state.cartList=value;
        },
        //生成订单的数据
        UPDATEORDER(state){
            state.orderListed=state.orderListed.concat(state.orderList)
        },
        ADDADDRESS(state,value){
            state.userAddress.map((item)=>{
                if(value.isDefault){
                    item.isDefault=false;
                }
            }) //全部遍历，把默认设为否，因为不知道哪一条是默认地址
            state.userAddress.push(value)
        }, //新增地址保存

        //编辑地址保存
        CHANGEADDRESS(state,value){
            state.userAddress=state.userAddress.map((item)=>{
                if(value.isDefault){
                    item.isDefault=false;//如果修改成默认地址，把之前所有地址变为false
                }
                return item.id === value.id?value:item
            })
        }, 

        //删除地址
        DELETEADDRESS(state,value){
           state.userAddress= state.userAddress.filter((item)=>{
                return !(value.id===item.id)
            })
            if(value.isDefault&&state.userAddress.length){
                state.userAddress[0].isDefault=true;
            }
        },

        //编辑
        EDIT(state,value){
           if(value==='delete'){
               state.edit=true;
           }
           else{
            state.edit=!state.edit
           }
        }
    },
    action:{},
})