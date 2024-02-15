<template>
  <div
    class="w-full message-editor"
    :class="{
      'placeholder-custom': isCustomPlaceholder,
      'disable-edit': props.isDisableEdit,
    }"
  >
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Extension } from '@tiptap/core';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { Placeholder } from '@tiptap/extension-placeholder';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import TemplateTextEmployerName from '~/plugins/utils/templateTextEmployerName';
import TemplateTextUserName from '~/plugins/utils/templateTextUserName';
import TemplateTextEntryNumber from '~/plugins/utils/templateTextEntryNumber';
import TemplateTextJobTitle from '~/plugins/utils/templateTextJobTitle';
import TemplateTextSelectionStep from '~/plugins/utils/templateTextSelectionStep';
import TemplateTextSelectionDate from '~/plugins/utils/templateTextSelectionDate';
import { ETemplateTextType } from '~~/utils/enum';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  templateText: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  isSetContent: {
    type: Boolean,
    default: false,
  },
  isDisableEnter: {
    type: Boolean,
    default: false,
  },
  isCustomPlaceholder: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  isDisableEdit: {
    type: Boolean,
    default: false,
  },
  isCreateJob: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  'update:modelValue',
  'resetTemplateText',
  'resetIsSetContent',
  'onFocus',
]);
const editor = ref<any>(null);

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});
const BreakLineCustom = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setHardBreak(),
    };
  },
});

watch(
  () => props.modelValue,
  async (value, prev) => {
    if (props.isSetContent) {
      editor.value.commands.setContent(
        await fixContentMessageEditor(value?.replace('\u00A0', '')),
      );
      emit('resetIsSetContent');
    } else if (!prev) {
      editor.value &&
        editor.value.commands.setContent(await fixContentMessageEditor(value));
    }
    await fixParseHTMLTemplateText();
  },
);
const editable = ref(props.editable);
watch(
  () => props.editable,
  (newValue) => {
    if (editor.value) {
      editor.value.setEditable(newValue);
    }
  },
);
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue?.replace('\u00A0', ''),
    extensions: props.isDisableEnter
      ? [
          DisableEnter,
          StarterKit,
          TemplateTextUserName,
          TemplateTextEmployerName,
          TemplateTextEntryNumber,
          TemplateTextJobTitle,
          TemplateTextSelectionStep,
          TemplateTextSelectionDate,
          Placeholder.configure({
            placeholder: props.placeholder,
          }),
          Link.configure({
            openOnClick: true,
            autolink: true,
          }),
        ]
      : props.isCreateJob
      ? [
          BreakLineCustom,
          StarterKit,
          Placeholder.configure({
            placeholder: props.placeholder,
          }),
          Link.configure({
            openOnClick: true,
            autolink: true,
          }),
        ]
      : [
          BreakLineCustom,
          StarterKit,
          TemplateTextUserName,
          TemplateTextEmployerName,
          TemplateTextEntryNumber,
          TemplateTextJobTitle,
          TemplateTextSelectionStep,
          TemplateTextSelectionDate,
          Placeholder.configure({
            placeholder: props.placeholder,
          }),
          Link.configure({
            openOnClick: true,
            autolink: true,
          }),
        ],
    editable: editable.value,
    onUpdate: async ({ editor }) => {
      if (!props.isSetContent) {
        const html = editor.getHTML();
        emit('update:modelValue', await fixContentMessageEditor(html));
      }
    },
    onFocus: () => {
      emit('onFocus');
    },
  });
});
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const handleAddText = (textSample: string) => {
  switch (textSample) {
    case ETemplateTextType.USER_NAME:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextUserName' })
        .run();
      break;
    case ETemplateTextType.EMPLOYER_NAME:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextEmployerName' })
        .run();
      break;
    case ETemplateTextType.ENTRY_NUMBER:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextEntryNumber' })
        .run();
      break;
    case ETemplateTextType.JOB_TITLE:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextJobTitle' })
        .run();
      break;
    case ETemplateTextType.SELECTION_DATE:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextSelectionDate' })
        .run();
      break;
    case ETemplateTextType.SELECTION_STEP:
      editor.value
        .chain()
        .focus()
        .insertContent({ type: 'templateTextSelectionStep' })
        .run();
      break;
    default:
      break;
  }
  emit('resetTemplateText');
};
watch(
  () => props.templateText,
  (newValue) => {
    if (newValue) {
      handleAddText(newValue);
    }
  },
);
</script>

<style lang="scss">
.message-editor {
  .ProseMirror {
    @apply overflow-y-auto rounded min-h-[56px] p-4 hover:outline-0 bg-white;
    &:focus-visible {
      @apply outline-0;
    }
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #a3a8ad;
    pointer-events: none;
    height: 0;
  }
}
.placeholder-custom {
  .ProseMirror p.is-editor-empty:first-child::before {
    @apply mobile:w-[190px];
  }
}
.disable-edit {
  .ProseMirror {
    @apply bg-gray-secondary rounded-b-none pointer-events-none #{!important};
  }
}
</style>
