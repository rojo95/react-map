import "./style/index.css";
import Swal from "sweetalert2";

/**
 * Configuration for toast by SweetAlert2
 *  @type {*} */
const Toast = Swal.mixin({
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    container: "swal2-shown",
  },
});

const Alert = (icon = "success", title, text = null) => {
  return Toast.fire({
    icon,
    title,
    text,
  });
};

const NotificationMessage = (icon = "success", title, text = null) => {
  return Toast.fire({
    icon,
    title,
    text,
    position: "top-end",
    toast: true,
  });
};

export { Alert, NotificationMessage };
export default NotificationMessage;
