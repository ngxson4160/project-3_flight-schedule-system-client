import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import { ElLoading } from 'element-plus';

export default class UploadFileCustom extends Plugin {
  static get requires() {
    return [FileRepository];
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('uploadFileCustom', (locale: any) => {
      const button = new ButtonView(locale);
      const t = editor.t;

      button.set({
        label: t('Insert file'),
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_984_82589" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_984_82589)">
        <path d="M5.8 19.175C5.3 19.175 4.875 19 4.525 18.65C4.175 18.3 4 17.875 4 17.375V14.675H5.5V17.375C5.5 17.4417 5.53333 17.5083 5.6 17.575C5.66667 17.6417 5.73333 17.675 5.8 17.675H17.2C17.2667 17.675 17.3333 17.6417 17.4 17.575C17.4667 17.5083 17.5 17.4417 17.5 17.375V14.675H19V17.375C19 17.875 18.825 18.3 18.475 18.65C18.125 19 17.7 19.175 17.2 19.175H5.8ZM10.75 15.3V6.9L8.275 9.35L7.225 8.275L11.5 4L15.775 8.275L14.725 9.35L12.25 6.9V15.3H10.75Z" fill="black"/>
        </g>
        </svg>
        `,
        tooltip: true,
        isToggleable: false,
      });

      button.on('execute', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.docx, .xlsx, .pptx, .pdf';
        input.click();

        input.addEventListener('change', async () => {
          const file = input.files?.[0];
          if (file) {
            if (file.size > 100 * 1024 * 1024) {
              openNotificationError('ファイルサイズが100MBを超えています');
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

            const linkUrl = uploadAdapter.getResponseUrl();
            editor.model.change((writer) => {
              const insertPosition =
                editor.model.document.selection.getFirstPosition();
              writer.insertText(
                fileNameWithoutSpaces,
                { linkHref: linkUrl },
                insertPosition,
              );
            });
          }
        });
      });

      return button;
    });
  }
}
