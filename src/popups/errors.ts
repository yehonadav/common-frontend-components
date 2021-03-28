import Swal, {SweetAlertOptions} from "sweetalert2";

export const baseErrorPopup = ({text, ...props}:SweetAlertOptions) => {
  // @ts-ignore
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text,
    confirmButtonText: 'OK',
    ...props
  });
  return false
};

type TerrorMessageError = {
  response: {
    data: {
      message: any;
    };
    statusText: any;
  };
} | any;

function error_message(e:TerrorMessageError) {
  return (e.response && e.response.data && e.response.data.message)
  || (e.response && e.response.statusText)
  || 'Something went wrong! Please try again later'
}

export const generic_error = (error: any) => {
  console.error('generic_error', error);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error,
    // text: error_message(error),
    confirmButtonText: 'OK',
    timer: 16000,
  });
  return false
};

