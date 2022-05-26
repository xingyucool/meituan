import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible';
import { 
    Button, 
    Icon,
    Tab, 
    Tabs,
    TreeSelect,
    Stepper,
    ActionBar, 
    ActionBarIcon, 
    ActionBarButton,Toast,
    Checkbox, CheckboxGroup, 
    SubmitBar,
    ContactCard,
    Card,
    Dialog,
    AddressList,
    AddressEdit,
    Field, CellGroup,
    Form,
} from 'vant';
import router from './router/index';
import './common/css/base.less';
import store from './store'
const app = createApp(App);

app
    .use(Button)
    .use(Icon)
    .use(Tab)
    .use(Tabs)
    .use(TreeSelect)
    .use(Stepper)
    .use(ActionBar)
    .use(ActionBarIcon)
    .use(ActionBarButton)
    .use(Toast)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(SubmitBar)
    .use(ContactCard)
    .use(Card)
    .use(Dialog)
    .use(AddressList)
    .use(AddressEdit)
    .use(Field)
    .use(CellGroup)
    .use(Form)
    

app.use(router);
app.use(store)
app.mount('#app');
