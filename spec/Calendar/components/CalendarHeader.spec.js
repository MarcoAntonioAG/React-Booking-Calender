import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import CalendarHeader from '../../../src/components/Calendar/src/components/CalendarHeader';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

describe('Calendar Header', function() {
  it('should render the day if view is setted to day', function() {
    const store = createMockStore({ calendar: { view: 'day', date: moment('2017-05-31') } });
    const wrapper = mount(<CalendarHeader store={store} />);

    expect(wrapper.find('.rbc-date').children().at(1).html()).to.be.equal('<span>May 31 2017</span>');
  });
});
