import Swal, {SweetAlertOptions, SweetAlertResult} from "sweetalert2";

export interface IdeletePopup extends SweetAlertOptions {
  name: string;
  value: string;
}

export const deleteWarningPopup = ({name, value, ...options}:IdeletePopup): Promise<SweetAlertResult> => {
  return (
    Swal.fire({
      title: 'Are you sure?',
      text: `${name} ${value} will be deleted`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete him!`,
      heightAuto: false,
      ...options
    })
  )
}
