/**
 * get file extension from name
 * @param name string
 */
export const getFileTypeFromName = (name: string): string => {
  return name.substring(name.lastIndexOf('.'));
};
