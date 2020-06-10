export const bookTitle = (file) => {
  return file ? (typeof file === 'string' ? file : file.path) : '';
};
