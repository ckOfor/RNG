// react
import React from 'react';

// third party
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme';

// component
import App from './components/App';

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
  it('renders the Home app <App /> components', () => {
    const wrapper = shallow(<App />);
    wrapper.find('Navbar').simulate('click');
    wrapper.find('NavItem').simulate('click');
    wrapper.find('Button').simulate('click');
  });
});
