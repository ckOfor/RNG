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
  
  it('renders three <App /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div')).to.have.lengthOf(3);
    
  });

  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
    App.prototype.componentDidMount.restore();
    wrapper.unmount();
  });

  it('renders divs', () => {
    const wrapper = render(<App />);
    expect(wrapper.find('div')).to.have.lengthOf(6);
    expect(wrapper.find('button')).to.have.lengthOf(2);
    expect(wrapper.find('Input')).to.have.lengthOf(1);
  });

  it('renders the title', () => {
    const wrapper = render(<App title="RNGTotal" />);
    expect(wrapper.text()).to.contain('RNGTotal');
  });
  
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
    wrapper.unmount();
  });
  
  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
    App.prototype.componentDidMount.restore();
    wrapper.unmount();
  });
});
