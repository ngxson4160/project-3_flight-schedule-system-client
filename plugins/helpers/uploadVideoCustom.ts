import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import { ElLoading } from 'element-plus';

export default class UploadVideoCustom extends Plugin {
  static get requires() {
    return [FileRepository];
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('uploadVideoCustom', (locale: any) => {
      const button = new ButtonView(locale);
      const t = editor.t;

      button.set({
        label: t('Insert video'),
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0H24V24H0z"></path> <path d="M16 4c.552 0 1 .448 1 1v4.2l5.213-3.65c.226-.158.538-.103.697.124.058.084.09.184.09.286v12.08c0 .276-.224.5-.5.5-.103 0-.203-.032-.287-.09L17 14.8V19c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1V5c0-.552.448-1 1-1h14zm-1 2H3v12h12V6zM9 8l4 4h-3v4H8v-4H5l4-4zm12 .841l-4 2.8v.718l4 2.8V8.84z"></path> </g> </g></svg>`,
        tooltip: true,
        isToggleable: false,
      });

      button.on('execute', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.mp4, .mov, .ogv, .m4v';
        input.click();

        input.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (file) {
            if (file.size > 500 * 1024 * 1024) {
              openNotificationError('ファイルサイズが500MBを超えています');
              return; // Exit the function if the file is too large
            }
            const fileNameWithoutSpaces = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores
            const modifiedFile = new File([file], fileNameWithoutSpaces, {
              type: file.type,
            });

            const svg = `<svg class="circular" viewBox="-10 -10 50 50"><path class="path" d="  M 30 15  L 28 17  M 25.61 25.61  A 15 15, 0, 0, 1, 15 30  A 15 15, 0, 1, 1, 27.99 7.5  L 15 15" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"></path></svg>`;
            const loading = ElLoading.service({
              lock: true,
              text: '',
              spinner: svg,
              background: 'rgba(255, 255, 255, 0.5)',
            });

            const uploadAdapter = new CKEditorCustomUploadAdapter(editor);
            await uploadAdapter.customUpload(modifiedFile);

            loading.close();

            editor.execute('mediaEmbed', `${uploadAdapter.getResponseUrl()}`);
          }
        });
      });

      return button;
    });
  }
}
