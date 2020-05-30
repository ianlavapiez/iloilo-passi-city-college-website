import Swal from 'sweetalert2'

export const popupMessageDialog = (icon, title) => {
  Swal.fire({
    position: 'center',
    icon,
    title,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const popupRALoginMessageDialogSuccess = (icon) => {
  Swal.fire({
    position: 'center',
    icon,
    title: 'Welcome',
    showConfirmButton: false,
    timer: 1500,
  })
}
