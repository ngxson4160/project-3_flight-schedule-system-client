import { IJwt } from './useBaseFetch';

const config = useRuntimeConfig();

export class CKEditorCustomUploadAdapter {
  loader: any;
  xhr: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  private uploadedUrl: string | null = null;

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  customUpload(file: any) {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject, file);
      this._sendRequest(file);
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    const { tokenClientEncrypt } = handleGetAuthCookie();

    let token;
    if (tokenClientEncrypt) {
      const client = handleJWTDecrypt(tokenClientEncrypt) as IJwt;
      token = client.token;
    }

    // TODO CORS

    xhr.open('POST', `${config.public.baseURL}/upload`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(
    resolve: { (value: unknown): void; (arg0: { default: string }): void },
    reject: { (reason?: any): void; (arg0: string | undefined): any },
    file: { name: any },
  ) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error
            ? response.error.message
            : genericErrorText,
        );
      }

      this.uploadedUrl = response.data;
      // const awsUrlUpload = config.public.awsURL;
      // resolve({
      //   default: `${awsUrlUpload}/${response.data[0].url}`,
      // });

      resolve({
        default: `${response.data}`,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener(
        'progress',
        (evt: { lengthComputable: any; total: any; loaded: any }) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        },
      );
    }
  }

  getResponseUrl(): string | null {
    return this.uploadedUrl;
  }

  // Prepares the data and sends the request.
  _sendRequest(file: string | Blob) {
    // Prepare the form data.
    const data = new FormData();

    data.append('file', file);
    // data.append('isAttachment', 'true');

    // Send the request.
    this.xhr.send(data);
  }
}

export function CKEditorCustomUploadAdapterPlugin(editor: {
  plugins: {
    get: (arg0: string) => {
      (): any;
      new (): any;
      createUploadAdapter: (loader: any) => CKEditorCustomUploadAdapter;
    };
  };
}) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new CKEditorCustomUploadAdapter(loader);
  };
}
