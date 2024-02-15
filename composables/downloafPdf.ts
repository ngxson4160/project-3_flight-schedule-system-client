export const handleDownLoadPdf = (param: string, token: string) => {
  const config = useRuntimeConfig();
  handleOpenNewTab(
    `${config.public.baseURL}/file-export/${param}/export?token=${token}`,
  );
};
