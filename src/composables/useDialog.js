import { useQuasar } from "quasar";
import AppDialog2 from "src/components/AppDialog2.vue";
import AppConfirmDialog2 from "src/components/AppConfirmDialog2.vue";

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
