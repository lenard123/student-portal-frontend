import { useQuasar } from "quasar";
import AppDialog2 from "src/components/AppDialog2.vue";
import AppConfirmDialog2 from "src/components/AppConfirmDialog2.vue";
import FileViewerDialog from "src/components/FileViewerDialog.vue";

export default function useDialog() {
  const $q = useQuasar();

  const dialog = ({ component, componentProps }) => {
    return $q.dialog({
      component: AppDialog2,
      componentProps: { component, componentProps },
    });
  };

  return {
    dialog,
  };
}

export const useFileViewerDialog = () => {
  const { dialog } = useDialog();
  const filesDialog = (files) => {
    return dialog({
      component: FileViewerDialog,
      componentProps: { files },
    });
  };

  return {
    dialog: filesDialog,
  };
};

export const useConfirmDialog = () => {
  const { dialog } = useDialog();
  const confirmDialog = ({ message, onSubmit }) => {
    return dialog({
      title: "Confirm",
      component: AppConfirmDialog2,
      componentProps: { message, onSubmit },
    });
  };

  return {
    dialog: confirmDialog,
  };
};
