import React from 'react';
import moment from 'moment';
import Slot from './Slot';

export default class Day extends React.Component {
  static defaultProps = {
      view: 'landscape'
  }

  getDate(isStart) {
    const dayName = this.props.date.format('dddd').toLowerCase();
    return isStart
      ? this.props.timeSlice[dayName].start
      : this.props.timeSlice[dayName].end;
  }

  getStyle(numberOfColumn, numberOfSlot) {
    if (this.props.style) {
      return this.props.style;
    }

    if (this.props.view === 'landscape') {
      return {
        width: 'calc((calc(100% - 100px) / ' + numberOfColumn + ') * ' + numberOfSlot + ')'
      };
    }

    return {
      height: 'calc(80px * ' + numberOfSlot + ')'
    };
  }

  render() {
    const start = moment(this.props.date).set({ hour: 8, minute: 0, second: 0 });
    const end = moment(this.props.date).set({ hour: 20, minute: 0, second: 0 });
    const spread = moment.duration(end.diff(start)).asMinutes();

    const workStart = moment(this.props.date).set({ hour: this.getDate(true), minute: 0, second: 0 })
    const workEnd = moment(this.props.date).set({ hour: this.getDate(false), minute: 0, second: 0 })

    const bookings = this.props.bookings.filter(booking => {
        return booking.startDate.format('L') === this.props.date.format('L');
    });

    let slots = [];
    let currentDate = start.clone();
    while(currentDate.isBefore(end)) {

      const startDate = currentDate.clone();
      let endDate = startDate.clone().add(this.props.timeSlot, 'm');

      const booking = bookings.find(booking => { return booking.startDate.isSame(startDate); });

      const numberOfColumn = spread /  this.props.timeSlot;

      if (booking) {
        const numberOfSlot = booking.endDate.diff(startDate, 'minutes') / this.props.timeSlot;
        slots.push(
          <Slot onClick={this.props.onClick}
                key={startDate}
                startDate={startDate}
                endDate={booking.endDate}
                numberOfSlot={numberOfSlot}
                style={this.getStyle(numberOfColumn, numberOfSlot)} />
        );

        if (booking.endDate.isBefore(endDate)) {
          const numberOfSlot = endDate.diff(booking.endDate, 'minutes') / this.props.timeSlot;
          slots.push(
            <Slot onClick={this.props.onClick}
                  key={slots.length}
                  startDate={booking.endDate}
                  endDate={endDate}
                  numberOfSlot={numberOfSlot}
                  style={this.getStyle(numberOfColumn, numberOfSlot)} />
          );
        } else if (booking.endDate.isAfter(endDate)) {
          const difference = booking.endDate.diff(endDate, 'minutes') % this.props.timeSlot;
          const numberOfSlot = difference / this.props.timeSlot;
          const nextEndDate = booking.endDate.clone().add(difference, 'm');

          if (!nextEndDate.isSame(booking.endDate)) {
            slots.push(
              <Slot onClick={this.props.onClick}
                    key={slots.length}
                    startDate={booking.endDate}
                    endDate={nextEndDate}
                    numberOfSlot={numberOfSlot}
                    style={this.getStyle(numberOfColumn, numberOfSlot)} />
            );
          }

          endDate = nextEndDate;
        } else {
          endDate = booking.endDate;
        }

      } else {
        if (startDate < workStart || startDate >= workEnd) {
          slots.push(
            <Slot key={slots.length}
                  style={this.getStyle(numberOfColumn, 1)}>
                {this.props.children}
            </Slot>
          );
        } else {
          const numberOfSlot = endDate.diff(startDate, 'minutes') / this.props.timeSlot;
          slots.push(
            <Slot onClick={this.props.onClick}
                  key={slots.length}
                  startDate={startDate}
                  endDate={endDate}
                  numberOfSlot={numberOfSlot}
                  style={this.getStyle(numberOfColumn, numberOfSlot)}>
                  {this.props.children}
            </Slot>
          );
        }

      }

      currentDate = endDate;
    }

    return (
      <div className='rbc-day'>
        {this.props.header ? (<div>{this.props.header}</div>) : (
          <div>
            <span>{this.props.date.format('MMM YYYY')}</span>
            <span>{this.props.date.format('DD')}</span>
            <span>{this.props.date.format('dddd')}</span>
          </div>
        )}
        {slots}
      </div>
    );
  }
}
