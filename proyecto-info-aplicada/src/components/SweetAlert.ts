import Swal from "sweetalert2";

/**
 *
 * @param icon Icon type
 * @param title Title of the alert
 * @param text Message of the alert
 * @param confirmButtonText Text of the confirm button
 */
export const SweetAlert = (
  icon: any,
  title: string,
  text: string,
  confirmButtonText: string
) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: confirmButtonText,
  });
};
