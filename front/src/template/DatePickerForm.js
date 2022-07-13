import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {ko} from 'date-fns/esm/locale'

import "react-datepicker/dist/react-datepicker.css"

export default function DatePickerForm() {
  
    const [startDate,setStartDate] = useState(new Date());
    const dateFunc = new Date();
    let firstDay = new Date(dateFunc.getMonth(),1)
    let lastDay = new Date(dateFunc.getFullYear(),dateFunc.getMonth()+1,0)
  return (
        <DatePicker
            dateFormat='yyyy-MM-dd'
            className="input-datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            // withPortal
            locale={ko}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            
        />
  )

 
}
