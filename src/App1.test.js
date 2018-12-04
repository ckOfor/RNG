// react
import React from 'react';

// third-party
import { mount, shallow } from 'enzyme'
import { spy, sinon } from 'sinon';

// component
import App from './components/App';

describe('Testing <App /> functions', () => {
  
  it('should call the onGenerateButtonClick method', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('Button.generate').simulate('click');
    console.log(action)
    expect(action).toBeInstanceOf(Object);
    wrapper.unmount();
  });
  
  it('should call the onGenerateButtonClick method', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('Input.range').simulate('click');
    console.log(action)
    expect(action).toBeInstanceOf(Object);
    wrapper.unmount();
  });
  
});
