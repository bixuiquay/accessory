import { saveAs } from 'file-saver';

export const downloadFromResponse = (response: any, fileName?: string) => {
  const blob = new Blob(["\ufeff", response.body]);

  saveAs(blob, fileName || getFileNameFromHttpResponse(response));
}

export const getFileNameFromHttpResponse = (response: any): string => {
  const contentDispositionHeader = response.headers.get('content-disposition');
  const fileName = contentDispositionHeader
    ? contentDispositionHeader.split(/[\s;]+/g).find((item: string) => item.includes('filename='))
    : null;

  return fileName
    ? fileName.replace('filename=', '')
    : 'file.json'
}
