import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertFormService {

  constructor() { }

  opensweetalert(text: string) {
    swal.fire({
      text: text,
      icon: 'success'
    });
  }
  opensweetalertdng(title: string, text: string) {
    //swal.fire('付款失敗', '欄位有誤', 'error');
    swal.fire({
      title: title,
      text: text,
      icon: 'error'
    });
  }

  // opensweetalertcst() {
  //   swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this imaginary file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       swal.fire(
  //         'Deleted!',
  //         'Your imaginary file has been deleted.',
  //         'success'
  //       )
  //       // For more information about handling dismissals please visit
  //       // https://sweetalert2.github.io/#handling-dismissals
  //     } else if (result.dismiss === swal.DismissReason.cancel) {
  //       swal.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   })
  // }

}
