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

describe('App', () => {
  let wrapper;
  
  it('should call the sortGeneratedNumbers method', () => {
    const wrapper = mount(<App />);
    const sortGeneratedNumbersSpy = spy(wrapper.instance(), 'sortGeneratedNumbers');
    wrapper.instance().sortGeneratedNumbers();
    expect(sortGeneratedNumbersSpy.called).toEqual(true);
  });
  
  it('should call the returnMaxAndMinSpy method', () => {
    const wrapper = mount(<App />);
    const returnMaxAndMinSpy = spy(wrapper.instance(), 'returnMaxAndMin');
    const action = wrapper.find('MenuItem#sdf').simulate('click');
    console.log(action)
    // expect(action).toBeInstanceOf(Object);
    // expect(returnMaxAndMinSpy.called).toEqual(true);
  });
  
  it('should simulate asc click', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('MenuItem.asc').simulate('click');
    expect(action).toBeInstanceOf(Object);
    console.log(action)
  });
  
  it('should simulate dsc click', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('MenuItem.dsc').simulate('click');
    expect(action).toBeInstanceOf(Object);
  });
  
  it('should simulate min click', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('MenuItem.min').simulate('click');
    expect(action).toBeInstanceOf(Object);
  });
  
  it('should simulate max click', () => {
    const wrapper = mount(<App />);
    const action = wrapper.find('MenuItem.max').simulate('click');
    expect(action).toBeInstanceOf(Object);
  });

  it('should call the onGenerateButtonClick method ', () => {
    const wrapper = mount(<App />);
    const onGenerateButtonClickSpy = spy(wrapper.instance(), 'onGenerateButtonClick');
    wrapper.instance().onGenerateButtonClick(100);
    expect(onGenerateButtonClickSpy.called).toEqual(true);
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
  
  it('should call the returnMaxAndMin method using dsc ', () => {
    const wrapper = mount(<App />);
    const returnMaxAndMinSpy = spy(wrapper.instance(), 'returnMaxAndMin');
    wrapper.instance().returnMaxAndMin(
      [
        { id: 1, value: "0911276029" },
        { id: 2, value: "0780997650" },
        { id: 3, value: "0141172042" },
      ],
      "min"
    );
    expect(returnMaxAndMinSpy.called).toEqual(true);
    wrapper.unmount()
  });
  
  it('should call the returnMaxAndMin method using dsc ', () => {
    const wrapper = mount(<App />);
    const returnMaxAndMinSpy = spy(wrapper.instance(), 'returnMaxAndMin');
    wrapper.instance().returnMaxAndMin(
      [
        { id: 1, value: "0911276029" },
        { id: 2, value: "0780997650" },
        { id: 3, value: "0141172042" },
      ],
      "max"
    );
    expect(returnMaxAndMinSpy.called).toEqual(true);
    wrapper.unmount()
  });
  
  it('renders without crashing', () => {
    const rendering = toJson(wrapper);
    expect(rendering).toMatchSnapshot();
  });
  
  
});
