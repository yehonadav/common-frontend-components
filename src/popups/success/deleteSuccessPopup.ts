import Swal, {SweetAlertResult} from "sweetalert2";
import {IDeletePopup} from '../warnings';

export const deleteSuccessPopup = ({name, value, ...options}:IDeletePopup): Promise<SweetAlertResult> => {
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
