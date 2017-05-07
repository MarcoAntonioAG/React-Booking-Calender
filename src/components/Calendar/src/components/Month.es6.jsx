import React from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';

import Day from "./Day";
import Slot from "./Slot";

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: undefined };
  }

  handleClick(e, date) {
      this.setState({ date: date })
  }

  renderDay(date, style) {
    return <Day onClick={this.props.onClick}
                date={date}
                canViewBooking={this.props.canViewBooking}
                timeSlice={this.props.timeSlice}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings}
                style={style} />;
  }

  renderSlot(date) {
    return <Slot startDate={date}
                 canViewBooking={this.props.canViewBooking}
                 onClick={(e) => this.handleClick(e, date)}>
             <span>{this.props.date.format('DD')}</span>
           </Slot>;
  }

  render() {
    const selectedDate = this.props.date;
    const daysInMonth = selectedDate.daysInMonth();

    if (this.state.date) {
      return this.renderDay(this.state.date, { width: '100%' });
    } else  {
      var days = [];
      for (var i = 1; i <= daysInMonth; i++) {
        var date = selectedDate.set('date', i).clone();
        days.push(
          <div key={date}>
            <MediaQuery minWidth={1024}>
              {this.renderDay(date)}
            </MediaQuery>
            <MediaQuery maxWidth={1024}>
              {this.renderSlot(date)}
            </MediaQuery>
          </div>
        )
      }

      return (<div className='rbc-month'>{days}</div>)
    }
  }
}
