<template>
  <div class="ck-content w-full">
    <client-only>
      <ckeditor
        v-model="editorData"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import {
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
} from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { DocumentList, DocumentListProperties } from '@ckeditor/ckeditor5-list';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import {
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from '@ckeditor/ckeditor5-image';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from '@ckeditor/ckeditor5-table';
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from '@ckeditor/ckeditor5-special-characters';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import UploadVideoCustom from '~~/plugins/helpers/uploadVideoCustom';
import UploadFileCustom from '~~/plugins/helpers/uploadFileCustom';
import TableOfContentsCustom from '~~/plugins/helpers/tableOfContentsCustom';

const props = defineProps({
  placeholder: {
    type: String,
    default: () => '',
  },
  content: {
    type: String,
    default: () => '',
  },
});
const emits = defineEmits(['update:content']);
const config = useRuntimeConfig();
const editorData = computed({
  get: () => props.content,
  set: (val: any) => {
    emits('update:content', val);
  },
});
const editor = ref(ClassicEditor);
const editorConfig = ref({
  extraPlugins: [CKEditorCustomUploadAdapterPlugin],
  plugins: [
    Essentials,
    Heading,
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    // Highlight,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    DocumentList,
    DocumentListProperties,
    Indent,
    IndentBlock,
    Alignment,
    AutoLink,
    Link,
    Paragraph,
    FontFamily,
    FontSize,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageInsert,
    ImageUpload,
    PictureEditing,
    LinkImage,
    BlockQuote,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    // SpecialCharacters,
    // SpecialCharactersEssentials,
    HorizontalLine,
    MediaEmbed,
    UploadVideoCustom,
    UploadFileCustom,
    TableOfContentsCustom,
  ],
  toolbar: {
    items: [
      'heading',
      '|',
      'fontSize',
      // 'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      // 'highlight',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      // 'outdent',
      // 'indent',
      // '|',
      'undo',
      'redo',
      'alignment',
      '|',
      'link',
      'insertImage',
      'uploadVideoCustom',
      'uploadFileCustom',
      'blockQuote',
      'insertTable',
      '|',
      // 'specialCharacters',
      '|',
      'horizontalLine',
      '|',
      'tableOfContentsCustom',
    ],
    shouldNotGroupWhenFull: false,
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22, 24, 30],
    supportAllValues: true,
  },
  image: {
    styles: ['alignCenter', 'alignLeft', 'alignRight'],
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'オリジナル',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75%',
        value: '75',
      },
    ],
    toolbar: [
      'imageStyle:block',
      'imageTextAlternative',
      'toggleImageCaption',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      'imageStyle:side',
      '|',
      'resizeImage',
      '|',
      'linkImage',
    ],
    insert: {
      integrations: ['insertImageViaUrl'],
    },
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
      'toggleTableCaption',
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  mediaEmbed: {
    previewsInData: true,
    providers: [
      {
        name: 'youtube',
        url: /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
        html: (match: any) => {
          const videoId = match[1];
          return `<iframe width="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="video-youtube-custom"></iframe>`;
        },
      },
    ],
    extraProviders: [
      {
        name: 'aws-s3',
        url: createRegexConfigEmbedFromUrl(config.public.urlAwsS3),
        html: (match: any) => {
          // Extract video URL from the match
          const videoUrl = match[0];
          // Generate the appropriate HTML for embedding the video
          return `<video controls width="100%" src="${videoUrl}#t=0.001" playsinline></video>`;
        },
      },
    ],
  },
});
</script>
