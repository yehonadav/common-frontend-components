import React, {FC, ReactElement, useState} from "react";
import {TimePicker} from "@material-ui/pickers";
import ScheduleIcon from '@material-ui/icons/Schedule';
import {MuiTextFieldProps} from "@material-ui/pickers/_shared/PureDateInput";
import {FormInput} from "./FormInput";
import { TimeInputType } from '../../types'
import { useMobile } from '../../stores'

export const TimeInput: FC<TimeInputType> = (
  {
    InputProps={},
    initialvalue,
    ...props
  }
  ): ReactElement =>
{
  const isMobile = useMobile();
  const [date, setDate] = useState<Date|undefined|null|string>(initialvalue);

  return (
    <TimePicker
      // @ts-ignore
      renderInput={(props:MuiTextFieldProps) =>
        <FormInput
          color="secondary"
          {...props}
          {...InputProps}
          // @ts-ignore
          inputRef={ref=>{props.inputRef && props.inputRef(ref); InputProps.inputRef && InputProps.inputRef(ref)}}
          InputProps={{...(props.InputProps || {}), ...(InputProps.InputProps || {})}}
          value={date}
        />
      }

      openPickerIcon={<ScheduleIcon color="secondary"/>}

      // @ts-ignore // TODO: check why theres an error here
      clearable
      displayStaticWrapperAs={isMobile? "mobile" : "desktop"}
      ampm={false}
      // @ts-ignore
      value={date}
      // @ts-ignore
      onChange={setDate}
      {...props}
    />
  )
}