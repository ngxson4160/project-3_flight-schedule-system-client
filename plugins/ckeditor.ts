export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.server) {
    // Import CKEditor and CKEditorCustom only on the client side
    const [CKEditor, CKEditorCustom] = await Promise.all([
      import('@ckeditor/ckeditor5-vue'),
      import('@/components/organisms/ckeditor/CKEditorCustom.vue'),
    ]);

    // Use CKEditor and register the CKEditorCustom component
    nuxtApp.vueApp.use(CKEditor.default);
    nuxtApp.vueApp.component('ckeditor-custom', CKEditorCustom.default);
  }
});
