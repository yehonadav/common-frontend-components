import Swal, {SweetAlertOptions} from "sweetalert2";

export const baseSuccessPopup = ({text, ...props}:SweetAlertOptions) =>
  // @ts-ignore
  Swal.fire({
    type: 'success',
    title: 'Sweet!',
    text,
    confirmButtonText: 'OK',
    ...props
  });