import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { guid } from '@progress/kendo-react-common';
import { timezoneNames } from '@progress/kendo-date-math';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { Scheduler, TimelineView, DayView, WeekView, MonthView, AgendaView, ITEMS_SELECT_ACTION } from '@progress/kendo-react-scheduler';
import weekData from 'cldr-core/supplemental/weekData.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import '@progress/kendo-date-math/tz/Etc/UTC';
import '@progress/kendo-date-math/tz/Europe/Sofia';
import '@progress/kendo-date-math/tz/Europe/Madrid';
import '@progress/kendo-date-math/tz/Asia/Dubai';
import '@progress/kendo-date-math/tz/Asia/Tokyo';
import '@progress/kendo-date-math/tz/America/New_York';
import '@progress/kendo-date-math/tz/America/Los_Angeles';
import esMessages from './es.json';
import axios from "axios";
import { FormWithCustomEditor } from "./custom-form";
// import { EditItemWithDynamicTitle } from "./custom-item";
import { sampleDataWithCustomSchema, displayDate, customModelFields } from './events-utcMain';
load(likelySubtags, currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);
loadMessages(esMessages, 'es-ES');

const App = () => {
  const [baseData, setbaseData] = useState([{}]);
  React.useEffect(async () => {
    await axios.get('http://localhost:8000/schedulars')
      .then(res => {
        //console.log(res.data)
        setbaseData(res.data)
      })
  }, []);
  const customModelFields = {
    taskId: 'taskId',
    title: 'title',
    description: 'description',
    start: 'start',
    end: 'end'
  };
  const currentYear = new Date().getFullYear();
  
  const [data, setData] = React.useState([]);
  const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  useEffect(() => {
    const sampleDataWithCustomSchema = baseData.map((dataItem) => ({
      ...dataItem,
      start: parseAdjust(dataItem.start),
      end: parseAdjust(dataItem.end),
      DeviceIDs: randomInt(1, 2),
      StationID: randomInt(1, 2)
    })
    );
    setData(sampleDataWithCustomSchema)
  }, [baseData])
  const timezones = React.useMemo(() => timezoneNames(), []);
  const locales = [{
    language: 'en-US',
    locale: 'en'
  }, {
    language: 'es-ES',
    locale: 'es'
  }];
  const [view, setView] = React.useState('day');
  const [date, setDate] = React.useState(displayDate);
  const [locale, setLocale] = React.useState(locales[0]);
  const [timezone, setTimezone] = React.useState('Etc/UTC');
  const [orientation, setOrientation] = React.useState('horizontal');
  const handleViewChange = React.useCallback(event => {
    setView(event.value);
  }, [setView]);
  const handleDateChange = React.useCallback(event => {
    setDate(event.value);
  }, [setDate]);
  const handleLocaleChange = React.useCallback(event => {
    setLocale(event.target.value);
  }, [setLocale]);
  const handleTimezoneChange = React.useCallback(event => {
    setTimezone(event.target.value);
  }, [setTimezone]);
  const handleOrientationChange = React.useCallback(event => {
    setOrientation(event.target.getAttribute('data-orientation'));
  }, []);

  const handleDataChange = React.useCallback(({
    created,
    updated,
    deleted
  }) => {
    setData(old => old.filter(item => deleted.find(current => current.taskId === item.taskId) === undefined).map(item => updated.find(current => current.taskId === item.taskId) || item).concat(created.map(item => Object.assign({}, item, {
      taskId: guid()
    }))));
    if (deleted != '') {
      axios.delete(`http://localhost:8000/schedulars/${deleted[0].taskId}`)   
    }
    if (updated.length !== 0) {
      axios
        .put(`http://localhost:8000/schedulars/${updated[0].taskId}`, updated[0])

    }
    if (created.length !== 0) {
      axios
        .post(`http://localhost:8000/schedulars/`, {taskId:guid(),...created[0]})
        console.log(created[0])
    }
  }, [setData]);


  return <div>

    <div className="example-config">
      <div className="row">
        <div className="col">
          <h5>Timezone:</h5>
          <DropDownList value={timezone} onChange={handleTimezoneChange} data={timezones} />
        </div>
        <div className="col">
          <h5>Locale:</h5>
          <DropDownList value={locale} onChange={handleLocaleChange} data={locales} textField="language" dataItemKey="locale" />
        </div>
        <div className="col">
          <h5>Orientation:</h5>
          <input type="radio" name="orientation" id="horizontal" data-orientation="horizontal" className="k-radio" checked={orientation === 'horizontal'} onChange={handleOrientationChange} />
          <label className="k-radio-label" htmlFor="horizontal">Horizontal</label>
          <br />
          <input type="radio" name="orientation" id="vertical" data-orientation="vertical" className="k-radio" checked={orientation === 'vertical'} onChange={handleOrientationChange} />
          <label className="k-radio-label" htmlFor="vertical">Vertical</label>
        </div>
      </div>
    </div>
    <LocalizationProvider language={locale.language}>
      <IntlProvider locale={locale.locale}>
        <Scheduler data={data} 
        form={FormWithCustomEditor}
        // editItem={EditItemWithDynamicTitle}
        group={{
          resources: ['Devices', 'Sectors'],
          orientation
        }} resources={[{
          name: 'Devices',
          data: [{
            text: 'Device 1',
            value: 1
          }, {
            text: 'Device 2',
            value: 2,
            color: '#FF7272'
          }],
          field: 'StationID',
          valueField: 'value',
          textField: 'text',
          colorField: 'color'
        }, {
          name: 'Sectors',
          data: [{
            text: 'SectorA',
            value: 1,
            color: '#5392E4'
          }, {
            text: 'SectorB',
            value: 2,
            color: '#54677B'
          }],
          field: 'DeviceIDs',
          valueField: 'value',
          textField: 'text',
          colorField: 'color'
        }]}
        onDataChange={handleDataChange} view={view} 
        onViewChange={handleViewChange} date={date} 
        onDateChange={handleDateChange} editable={true} 
        timezone={timezone} modelFields={customModelFields} >
          <TimelineView />
          <DayView />
          <WeekView />
          <MonthView />
          <AgendaView />
        </Scheduler>
      </IntlProvider>
    </LocalizationProvider>
  </div>;
};

ReactDOM.render(<App />, document.querySelector('my-app'));