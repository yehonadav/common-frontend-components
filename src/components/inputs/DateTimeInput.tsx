import React, {FC, useState} from "react";
import {DateTimePicker} from "@material-ui/pickers/DateTimePicker";
import EventIcon from "@material-ui/icons/Event";
import {FormInput} from "./FormInput";
import {MuiTextFieldProps} from "@material-ui/pickers/_shared/PureDateInput";
import { DateTimeInputType, NullableDate } from '../../types'
import { defaultOnDateChange } from '../../utils'
import { useMobile } from '../../stores'

export const DateTimeInput: FC<DateTimeInputType> = (
  {
    InputProps={},
    initialvalue=null,
    onDateChange=defaultOnDateChange,
    ...props
  }) =>
{
  const isMobile = useMobile();
  const [date, setDate] = useState<NullableDate>(initialvalue);

  const handleChange = (date:Date) => {
    setDate(onDateChange(date))
  }

  return (
    <DateTimePicker
      // @ts-ignore
      renderInput={(props:MuiTextFieldProps) =>
        <FormInput
          color="secondary"
          type="text"
          {...props}
          {...InputProps}
          helperText={InputProps.error||props.helperText}
          inputRef={ref=>{
            // @ts-ignore
            props.inputRef && props.inputRef(ref);
            // @ts-ignore
            InputProps.inputRef && InputProps.inputRef(ref);
          }}
        />
      }
      openPickerIcon={<EventIcon color="secondary"/>}

      // keyboardIcon={icon}

      // @ts-ignore // TODO: check why theres an error
      clearable
      displayStaticWrapperAs={isMobile? "mobile" : "desktop"}
      ampm={false}
      // format="yyyy/MM/dd HH:mm"
      // placeholder="year/month/day hour:minute"
      // error={!!error}
      // helperText={error}
      // @ts-ignore
      value={date}
      // @ts-ignore
      onChange={handleChange}
      {...props}
    />
  )
}