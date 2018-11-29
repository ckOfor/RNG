// react
import React from 'react';

// third-party
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';

// component
import App from './components/App';

describe('<App />', () => {
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders three <Foo /> components', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('div')).to.have.lengthOf(8);
  });
  
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });
  
  it('calls componentDWillMount', () => {
    spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
    App.prototype.componentDidMount.restore();
  });
  
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<App />);
    expect(wrapper.find('div')).to.have.lengthOf(7);
  });
  
});
