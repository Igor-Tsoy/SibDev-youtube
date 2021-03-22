import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';
import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Container,
  ButtonGroup,
  Select,
  Option,
  Slider,
  Notification
} from 'element-ui';

const elements = [
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Container,
  ButtonGroup,
  Select,
  Option,
  Slider
];

locale.use(lang);
elements.forEach(El => Vue.use(El, { locale }));
Vue.prototype.$notify = Notification;
