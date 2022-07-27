import { MODAL_INJECTION_KEY } from '../constants';
import { ModalContext } from '../types/modal';

export const useModal = () => {
  return useSafeInject<ModalContext>(MODAL_INJECTION_KEY);
};
