import { ElLoading } from 'element-plus';

export const activeLoading = (val: boolean) => {
  const svg = `<svg class="circular" viewBox="-10 -10 50 50"><path class="path" d="  M 30 15  L 28 17  M 25.61 25.61  A 15 15, 0, 0, 1, 15 30  A 15 15, 0, 1, 1, 27.99 7.5  L 15 15" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"></path></svg>`;

  const loading = ElLoading.service({
    lock: true,
    text: '',
    spinner: svg,
    background: 'rgba(255, 255, 255, 0.5)',
  });
  if (val) {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

export const onLoading = () => {
  activeLoading(false);
};

export const closeLoading = () => {
  activeLoading(true);
};
