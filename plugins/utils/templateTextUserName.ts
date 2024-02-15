import { Node } from '@tiptap/vue-3';
import { ETemplateTextType } from '~~/utils/enum';
import { formatTemplateText } from '~~/utils/helper';
export default Node.create({
  name: 'templateTextUserName',
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
        default: 'template-text-editor template-user-name',
      },
      id: {
        default: 'templateTextUserName',
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
      formatTemplateText(ETemplateTextType.USER_NAME),
    ];
  },
});
