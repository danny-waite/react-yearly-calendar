import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Calendar, CalendarControls } from 'react-yearly-calendar';
import './style.css';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    const today = moment();

    this.state = {
      year: today.year(),
      selectedDay: null,
      selectedRange: [today, moment(today).add(15, 'day')],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 0 // sunday
    };
  }

  onPrevYear() {
    this.setState(prevState => ({
      year: prevState.year - 1
    }));
  }

  onNextYear() {
    this.setState(prevState => ({
      year: prevState.year + 1
    }));
  }

  goToToday() {
    const today = moment();

    this.setState({
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      year: today.year()
    });
  }

  datePicked(date) {
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day')]
    });
  }

  rangePicked(start, end) {
    this.setState({
      selectedRange: [start, end],
      selectedDay: start
    });
  }

  toggleShowDaysOfWeek() {
    this.setState(prevState => ({
      showDaysOfWeek: !prevState.showDaysOfWeek
    }));
  }

  toggleForceFullWeeks() {
    this.setState(prevState => ({
      showDaysOfWeek: true,
      forceFullWeeks: !prevState.forceFullWeeks
    }));
  }

  toggleShowTodayBtn() {
    this.setState(prevState => ({
      showTodayBtn: !prevState.showTodayBtn
    }));
  }

  toggleShowWeekSeparators() {
    this.setState(prevState => ({
      showWeekSeparators: !prevState.showWeekSeparators
    }));
  }

  toggleSelectRange() {
    this.setState(prevState => ({
      selectRange: !prevState.selectRange
    }));
  }

  selectFirstDayOfWeek(event) {
    this.setState({
      firstDayOfWeek: parseInt(event.target.value, 10)
    });
  }

  render() {
    const {
      year,
      showTodayBtn,
      selectedDay,
      showDaysOfWeek,
      forceFullWeeks,
      showWeekSeparators,
      firstDayOfWeek,
      selectRange,
      selectedRange
    } = this.state;

    return (
      <div>
        <div id="calendar">
          <CalendarControls
            year={year}
            showTodayButton={showTodayBtn}
            onPrevYear={() => this.onPrevYear()}
            onNextYear={() => this.onNextYear()}
            goToToday={() => this.goToToday()}
          />
          <Calendar
            year={year}
            selectedDay={selectedDay}
            showDaysOfWeek={showDaysOfWeek}
            forceFullWeeks={forceFullWeeks}
            showWeekSeparators={showWeekSeparators}
            firstDayOfWeek={firstDayOfWeek}
            selectRange={selectRange}
            selectedRange={selectedRange}
            onPickDate={date => this.datePicked(date)}
            onPickRange={(start, end) => this.rangePicked(start, end)}
            data={[{ date: '2021-02-10', price: 123.45, bookable: true }]}
          />
        </div>

        <h5>
          Proudly brought to you by <a href="https://belkadigital.com/">Belka</a>
        </h5>

        <div className="options">
          <b>Demo Options</b>
          <br />
          <ul>
            <li>
              <input
                id="showDaysOfWeek"
                type="checkbox"
                checked={showDaysOfWeek}
                onChange={() => this.toggleShowDaysOfWeek()}
              />
              <label htmlFor="showDaysOfWeek">Show days of week</label>
            </li>
            <li>
              <input
                id="forceFullWeeks"
                type="checkbox"
                checked={forceFullWeeks}
                onChange={() => this.toggleForceFullWeeks()}
              />
              <label htmlFor="forceFullWeeks">Force full weeks</label>
            </li>
            <li>
              <input
                id="showTodayBtn"
                type="checkbox"
                checked={showTodayBtn}
                onChange={() => this.toggleShowTodayBtn()}
              />
              <label htmlFor="showTodayBtn">Show &apos;Today&apos; button</label>
            </li>
            <li>
              <input
                id="showWeekSeparators"
                type="checkbox"
                checked={showWeekSeparators}
                onChange={() => this.toggleShowWeekSeparators()}
              />
              <label htmlFor="showWeekSeparators">Show week separators</label>
            </li>
            <li>
              <label htmlFor="firstDayOfWeek">First day of week</label>
              <select id="firstDayOfWeek" value={firstDayOfWeek} onChange={e => this.selectFirstDayOfWeek(e)}>
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <option key={i} value={i}>
                    {moment()
                      .weekday(i)
                      .format('ddd')}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <input id="selectRange" type="checkbox" checked={selectRange} onChange={() => this.toggleSelectRange()} />
              <label htmlFor="selectRange">Select Date range</label>
            </li>
          </ul>
          <br />
          <i>All these options are available as Calendar props.</i>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
