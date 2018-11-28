// react
import React from 'react';

// third party
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// component
import App from './components/App';

// enzyme
Enzyme.configure({ adapter: new Adapter() })




// import ReactDOM from 'react-dom';

// import { shallow, mount } from 'enzyme';
// import toJson from 'enzyme-to-json';
//
//

//
// describe('<App />', () => {
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
//
//
//
//   it('renders the Home app <App /> components', () => {
//     const wrapper = mount(<App />);
//     const rendering = toJson(wrapper);
//     expect(rendering).toMatchSnapshot();
//     wrapper.find('Navbar').simulate('click');
//   });
//
//   it('renders the generate button <App /> components', () => {
//     const wrapper = mount(<App />);
//     expect(wrapper.find('Button').length).toBe(2);
//   });
// });
//
//

