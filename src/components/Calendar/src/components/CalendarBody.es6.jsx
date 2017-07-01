import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import {find, isEqual} from 'lodash';

import Month from "./month/Month";
import Day from "./day/Day";
import Week from "./week/Week";
import {getBookingsForDay} from '../util';

export default class CalendarBody extends React.Component {
    getDate(isStart) {
        const currentDay = this.props.date.format('dddd').toLowerCase();
        return isStart
        ? this.props.timeSlices[currentDay].start
        : this.props.timeSlices[currentDay].end;
    }

    renderContent() {
        if (this.props.view === 'day') {
            const timeSlice = find(this.props.timeSlices, x => x.date.format('dddd') === this.props.date.format('dddd'));
            const bookings = getBookingsForDay(this.props.bookings, this.props.date);

            return (
                <div>
                    <Day onClick={this.props.onDayClick}
                        date={this.props.date}
                        canOpenBookedSlot={this.props.canViewBooking}
                        timeSlice={timeSlice}
                        timeSlot={this.props.timeSlot}
                        bookings={bookings}
                        style={{ width: '100%' }}/>
                </div>
            )
        }

        if (this.props.view === 'month') {
            return <Month onClick={this.props.onDayClick}
                date={this.props.date}
                canViewBooking={this.props.canViewBooking}
                timeSlices={this.props.timeSlices}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings} />
        }

        if (this.props.view === 'week') {
            return <Week onClick={this.props.onDayClick}
                date={this.props.date}
                canViewBooking={this.props.canViewBooking}
                timeSlices={this.props.timeSlices}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings} />
        }
    }

    render() {
        return (<div className='rbc-body'>{this.renderContent()}</div>);
    }
}
