import { Node } from '@tiptap/vue-3';
import { ETemplateTextType } from '~~/utils/enum';
import { formatTemplateText } from '~~/utils/helper';
export default Node.create({
  name: 'templateTextEmployerName',
  content: 'inline*',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      editable: {
        default: false,
      },
      class: {
        default: 'template-text-editor template-employer-name',
      },
      id: {
        default: 'templateTextEmployerName',
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      { ...HTMLAttributes },
      formatTemplateText(ETemplateTextType.EMPLOYER_NAME),
    ];
  },
});
