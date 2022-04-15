export const getExtension = (mimetype: string) => {
  switch (true) {
    case mimetype === 'image/jpeg':
      return '.jpeg';
    case mimetype === 'image/png':
      return '.png';
    case mimetype === 'image/jpg':
      return '.jpg';
    case mimetype === 'video/mp4':
      return '.mp4';
    case mimetype === 'video/x-msvideo':
      return '.avi';
    case mimetype === 'video/x-ms-wmv':
      return '.wmv';
    default:
      return '';
  }
};
