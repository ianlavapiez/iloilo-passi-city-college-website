import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const fireAlertWithConfirmation = (
  confirmationText,
  resultText,
  callback
) => {
  MySwal.fire({
    title: <p> {confirmationText}</p>,
    footer: 'Brainhub',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((confirmed) => {
    callback(confirmed && confirmed.value === true)
  })
}

// Normal Alert with 2 parameters the alert text and type of alertbox
export const fireAlert = (text, type) => {
  MySwal.fire({
    title: <p> {text}</p>,
    type: type,
  })
}
