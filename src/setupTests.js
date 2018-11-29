import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import $ from 'jquery';

global.$ = $;
$.prototype.sideNav = () => { };
$.prototype.dropdown = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.ready = fn => fn();

global.Materialize = {
  toast: () => {}
};

configure({ adapter: new Adapter() });
