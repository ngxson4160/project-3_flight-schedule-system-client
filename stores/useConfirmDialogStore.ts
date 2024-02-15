import { defineStore } from 'pinia';

type TOptions = {
  title: string;
  description: string;
  cancelText?: string;
  classDescription?: string;
  okText?: string;
};

type TState = {
  visible: boolean;
  title: string;
  description: string;
  cancelText: string;
  okText: string;
  classDescription?: string;
  resolve: any;
  reject: any;
};

export const useConfirmDialogStore = defineStore({
  id: 'useConfirmDialogStore',
  state: () =>
    ({
      visible: false,
      title: '',
      description: '',
      okText: '',
      cancelText: '',
      classDescription: '',
      resolve: null,
      reject: null,
    } as TState),
  actions: {
    show(options: TOptions) {
      this.title = options.title;
      this.description = options.description;
      this.cancelText = options.cancelText || '';
      this.okText = options.okText || '';
      this.classDescription = options.classDescription || '';
      this.visible = true;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    hide() {
      this.visible = false;
      this.title = '';
      this.description = '';
    },

    ok() {
      if (this.resolve) this.resolve(true);

      this.hide();
    },

    cancel() {
      if (this.resolve) this.resolve(false); // Also use reject instead

      this.hide();
    },
  },
});
