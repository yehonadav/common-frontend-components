import Swal, {SweetAlertResult} from "sweetalert2";
import {IdeletePopup} from '../warnings';

export const deleteSuccessPopup = ({name, value, ...options}:IdeletePopup): Promise<SweetAlertResult> => {
  return (
    Swal.fire({
      title: 'Deleted',
      text: `${name} ${value} has been deleted.`,
      icon: 'success',
      heightAuto: false,
      ...options
    })
  )
}
