// react
import React from 'react';

// third-party libraries
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';

// component
import App from './components/App';

const mock = require('mock-fs');

const mockData = [
  {
    id: 1,
    value: '0987654321',
  },
  {
    id: 2,
    value: '0123456789',
  },
];

let event = {
  target: {
    name: 'numberToGenerate',
    value: 1000,
    selectedOptions: [
      { innerHTML: 'selected name' },
    ],
  },
  preventDefault: spy(),
};


describe('App', () => {
  let wrapper;
  
  it('should ensure ascending order is clicked', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('NavItem.asc').simulate('click');
    expect(action).toBeInstanceOf(Object);
    wrapper.unmount();
  });
  
  it('should ensure descending order is clicked', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('NavItem.dsc').simulate('click');
    expect(action).toBeInstanceOf(Object);
    wrapper.unmount();
  });
  
  it('should ensure dropdown is clicked', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('Dropdown.dropdown').simulate('click');
    expect(action).toBeInstanceOf(Object);
    wrapper.unmount();
  });

  it('should call the onGenerateButtonClick method', () => {
    const wrapper = mount(<App />);
    const onGenerateButtonClickSpy = spy(wrapper.instance(), 'onGenerateButtonClick');
    wrapper.instance().onGenerateButtonClick(100);
    expect(onGenerateButtonClickSpy.called).toEqual(true);
    wrapper.unmount();
  });
  
  it('should call the updateRange method ', () => {
    const wrapper = mount(<App />);
    const updateRangeSpy = spy(wrapper.instance(), 'updateRange');
    wrapper.instance().updateRange(event);
    expect(updateRangeSpy.called).toEqual(true);
    wrapper.unmount();
  });

  it('should call the sortGeneratedNumbers method using asc ', () => {
    const wrapper = mount(<App />);
    const sortGeneratedNumbersSpy = spy(wrapper.instance(), 'sortGeneratedNumbers');
    wrapper.instance().sortGeneratedNumbers(
      [
        { id: 1, value: "0911276029" },
        { id: 2, value: "0780997650" },
        { id: 3, value: "0141172042" },
      ],
      "asc"
    );
    expect(sortGeneratedNumbersSpy.called).toEqual(true);
    wrapper.unmount();
  });
  
  it('should call the phoneNumberGenerator method using range of 10 ', () => {
    const wrapper = mount(<App />);
    const phoneNumberGeneratorSpy = spy(wrapper.instance(), 'phoneNumberGenerator');
    wrapper.instance().phoneNumberGenerator(10);
    expect(phoneNumberGeneratorSpy.called).toEqual(true);
    wrapper.unmount();
  });
  

  it('should call the sortGeneratedNumbers method using dsc ', () => {
    const wrapper = mount(<App />);
    const sortGeneratedNumbersSpy = spy(wrapper.instance(), 'sortGeneratedNumbers');
    wrapper.instance().sortGeneratedNumbers(
      [
        { id: 1, value: "0911276029" },
        { id: 2, value: "0780997650" },
        { id: 3, value: "0141172042" },
      ],
      "dsc"
    );
    expect(sortGeneratedNumbersSpy.called).toEqual(true);
    wrapper.unmount()
  });
  
  it('renders without crashing', () => {
    const rendering = toJson(wrapper);
    expect(rendering).toMatchSnapshot();
  });
  
  
});
