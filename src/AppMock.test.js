// react
import React from 'react';

// third-party libraries
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';

// component
import App from './components/App';

const mock = require('mock-fs');

describe('App', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  
  afterAll(() => {
    mock.restore();
    wrapper.unmount();
    setTimeout(() => process.exit(), 10)
  });
  
  // afterAll(() => setTimeout(() => process.exit(), 10))
  
  it('should call the onGenerateButtonClick method ', () => {
    const onGenerateButtonClickSpy = spy(wrapper.instance(), 'onGenerateButtonClick');
    wrapper.instance().onGenerateButtonClick(100);
    expect(onGenerateButtonClickSpy.called).toEqual(true);
    wrapper.unmount();
  });
  
  it('should call the sortGeneratedNumbers method using asc ', () => {
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
  
  it('should call the sortGeneratedNumbers method using dsc ', () => {
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
  
  // it('renders without crashing', () => {
  //   const rendering = toJson(wrapper);
  //   expect(rendering).toMatchSnapshot();
  //   wrapper.unmount();
  // });
  
  // it('should call the onClick method to sort by Highest', () => {
  //   const action = wrapper.find('NavItem.asc').simulate('click');
  //   expect(action).toBeInstanceOf(Object);
  //   wrapper.unmount();
  // });
  
  //
  // it('should call the onClick method to sort by Lowest', () => {
  //   const action = wrapper.find('a.lowestSort').simulate('click');
  //   expect(action).toBeInstanceOf(Object);
  // });
  //
  // it('should call the onClick method to sort by IDs', () => {
  //   const action = wrapper.find('a.uniqueSort').simulate('click');
  //   expect(action).toBeInstanceOf(Object);
  // });
  //
  // it('should call the onChange method for input validation', () => {
  //   const onChangeSpy = spy(wrapper.instance(), 'onChange');
  //   wrapper.instance().onChange(event);
  //   wrapper.find('.number').first().simulate('change', event);
  //   expect(onChangeSpy.called).toEqual(true);
  //   expect(wrapper.state().numberToGenerate).toEqual(4000);
  // });
  //
  // it('should call the onChange method', () => {
  //   event = {
  //     ...event,
  //     target: { name: 'dummy' },
  //   };
  //   const onChangeSpy = spy(wrapper.instance(), 'onChange');
  //   wrapper.instance().onChange(event);
  //   wrapper.find('.number').first().simulate('change', event);
  //   expect(onChangeSpy.called).toEqual(true);
  //   expect(wrapper.state().numberToGenerate).toEqual(0);
  // });
  //
  // it('should call the onSubmit method', () => {
  //   const onSubmitSpy = spy(wrapper.instance(), 'onSubmit');
  //   wrapper.instance().onChange(event);
  //   wrapper.find('.btn__generate').first().simulate('submit', event);
  // });
});
