import { Ref } from 'vue';

export type ModalContext = {
  isOpened: Ref<boolean>;
  isScrollInside: Ref<boolean>;
  close: () => void;
  open: () => void;
  toggle: () => void;
};
