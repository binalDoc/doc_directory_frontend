import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty } from "../utils/helper";

const success = (message = "", options = {}) => {
  if (isEmpty(message)) return;
  dismiss();
  return toast.success(message, options);
};

const info = (message = "", options = {}) => {
  if (isEmpty(message)) return;
  dismiss();

  return toast.info(message);
};

const warning = (message = "", options = {}) => {
  if (isEmpty(message)) return;
  dismiss();

  return toast.warning(message);
};

const error = (message = "", options = {}) => {
  if (isEmpty(message)) return;
  dismiss();

  return toast.error(message);
};

const loading = (message = "", options = {}) => {
  if (isEmpty(message)) return;
  dismiss();

  return toast.loading(message);
};

const dismiss = (id = null) => {
  if (id) {
    toast.dismiss(id);
  } else {
    toast.dismiss()
  }
};

const toaster = {
  success,
  warning,
  error,
  info,
  loading,
  dismiss,
};

export default toaster;
