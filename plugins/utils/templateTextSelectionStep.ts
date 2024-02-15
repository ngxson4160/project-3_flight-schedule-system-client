import { Node } from '@tiptap/vue-3';
import { ETemplateTextType } from '~~/utils/enum';
import { formatTemplateText } from '~~/utils/helper';
export default Node.create({
  name: 'templateTextSelectionStep',
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
        default: 'template-text-editor template-selection-step',
      },
      id: {
        default: 'templateTextSelectionStep',
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
      formatTemplateText(ETemplateTextType.SELECTION_STEP),
    ];
  },
});
