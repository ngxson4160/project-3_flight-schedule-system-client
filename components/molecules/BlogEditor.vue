<template>
  <div class="w-full relative blog-editor">
    <div class="editor-toolbar mb-1">
      <div class="editor-toolbar-group">
        <div
          class="toolbar-item"
          :class="{ 'is-active': editor && editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          <img src="@/assets/images/editor/bold.svg" alt="" />
        </div>
        <div
          class="toolbar-item"
          :class="{ 'is-active': editor && editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        >
          <img src="@/assets/images/editor/italic.svg" alt="" />
        </div>
        <div
          class="toolbar-item"
          :class="{ 'is-active': editor && editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        >
          <img src="@/assets/images/editor/strikethrough.svg" alt="" />
        </div>
      </div>
      <div class="toolbar-divider"></div>
      <div class="editor-toolbar-group">
        <div
          class="toolbar-item"
          :class="{
            'is-active': editor && editor.isActive({ textAlign: 'left' }),
          }"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <img src="@/assets/images/editor/left-alignment.svg" alt="" />
        </div>
        <div
          class="toolbar-item"
          :class="{
            'is-active': editor && editor.isActive({ textAlign: 'center' }),
          }"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <img src="@/assets/images/editor/center-alignment.svg" alt="" />
        </div>
        <div
          class="toolbar-item"
          :class="{
            'is-active': editor && editor.isActive({ textAlign: 'right' }),
          }"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <img src="@/assets/images/editor/right-alignment.svg" alt="" />
        </div>
        <div
          class="toolbar-item"
          :class="{
            'is-active': editor && editor.isActive({ textAlign: 'justify' }),
          }"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <img src="@/assets/images/editor/justify-alignment.svg" alt="" />
        </div>
        <div
          v-if="isLink"
          class="toolbar-item"
          :class="{
            'is-active': editor && editor.isActive('link'),
          }"
          @click="setLink"
        >
          <img src="@/assets/images/editor/end-page-arrow-24.png" alt="" />
        </div>
      </div>
    </div>
    <editor-content :editor="editor" />

    <div
      class="absolute left-2 bottom-2 bg-black py-1 px-2 rounded cursor-pointer bg-opacity-80 upload-blog-editor"
      @click="imageSelector.click()"
    >
      <img
        class="max-w-[15px]"
        src="@/assets/images/editor/image-upload.svg"
        alt=""
      />
      <input
        ref="imageSelector"
        class="hidden"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        @change="handleUpload"
      />
    </div>
  </div>
  <h1 class="text-danger text-xs">{{ messageError }}</h1>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import { TextAlign } from '@tiptap/extension-text-align';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { uploadFileStore } from '@/stores/upload';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isLink: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);
const { uploadFiles } = uploadFileStore();
const editor = ref<any>(null);
const imageSelector = ref<any>(null);

watch(
  () => props.modelValue,
  (value, prev) => {
    if (!prev) {
      editor.value && editor.value.commands.setContent(value);
    }
  },
);

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link,
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      emit('update:modelValue', html);
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const setLink = () => {
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();

    return;
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
};

const messageError = ref('');
const handleUpload = async (e: any) => {
  if (!e.target.files?.length) return;

  const formData = new FormData();
  const file = e.target.files[0];
  const typeImg = ['image/jpeg', 'image/png', 'image/webp'];
  const isCheckType = typeImg.includes(file.type);

  if (file.size / 1024 / 1024 > 10) {
    messageError.value = 'ファイルサイズが10MBを超えています';
    return;
  } else if (!isCheckType) {
    messageError.value = 'JPGもしくはPNG形式のみサポートされています';
  } else {
    messageError.value = '';
  }

  formData.append('file', file);
  if (imageSelector.value) {
    imageSelector.value.value = '';
  }
  if (isCheckType && file.size / 1024 / 1024 < 10) {
    const response = await uploadFiles(formData);
    if (response) {
      editor.value.chain().focus().setImage({ src: response }).run();
    }
  }
};
</script>

<style lang="scss">
.blog-editor {
  .ProseMirror {
    @apply rounded border border-slate-200 pt-2 pb-8 px-4 min-h-[496px] hover:outline-0 bg-white;

    &:focus-visible {
      @apply outline-0;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  }
}

.editor-toolbar {
  @apply flex bg-slate-100 p-1 rounded;

  .editor-toolbar-group {
    @apply inline-flex items-center;
    img {
      @apply h-4 w-4;
    }

    .toolbar-item {
      @apply inline-flex h-6 w-6 justify-center items-center cursor-pointer;

      &:not(:first-child) {
        @apply ml-2;
      }

      &:hover {
        @apply bg-blue-200 rounded;
      }

      &.is-active {
        @apply bg-blue-200 rounded;
      }
    }
  }

  .toolbar-divider {
    @apply w-8 inline-block relative;

    &:before {
      content: '';
      @apply h-5 absolute left-1/2 border-l border-slate-300;
      top: 0.125em;
    }
  }
}
</style>
