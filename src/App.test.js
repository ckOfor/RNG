// react
import React from 'react';

// third party
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

// component
import App from './components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<MyComponent />', () => {
  it('renders three <App /> components', () => {
    const wrapper = shallow(<App />);
    // expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });
});
