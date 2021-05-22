import React, {FC, useState} from "react";
import {DatePicker} from "@material-ui/pickers/DatePicker";
import EventIcon from "@material-ui/icons/Event";
import {FormInput} from "./FormInput";
import {MuiTextFieldProps} from "@material-ui/pickers/_shared/PureDateInput";
import { DateTimeInputType, NullableDate } from '../../types'
import { defaultOnDateChange } from '../../utils'
import { useMobile } from '../../stores'

export const DateInput: FC<DateTimeInputType> = (
  {
    InputProps={},
    initialvalue=null,
    onDateChange=defaultOnDateChange,
    ...props
  }) =>
{
  const isMobile = useMobile();
  const [date, setDate] = useState<NullableDate>(initialvalue||null);

  const handleChange = (date:Date) => {
    setDate(onDateChange(date))
  }

  return (
    // @ts-ignore
    <DatePicker
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
      // @ts-ignore // TODO: check why error
      clearable
      displayStaticWrapperAs={isMobile? "mobile" : "desktop"}
      ampm={false}
      // @ts-ignore
      value={date}
      // @ts-ignore
      onChange={handleChange}
      {...props}
    />
  )
}