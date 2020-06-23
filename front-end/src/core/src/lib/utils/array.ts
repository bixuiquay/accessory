export const arrayToString = (arr: string[], delimiter = ', '): string => {
  return (arr && arr.length) ? arr.join(delimiter) : '';
}

export const stringToArray = (str: string, delimiter = ', '): string[] => {
  return str ? str.split(delimiter) : [];
}

export const splitToArray = (str: string, delimiter = ','): string[] => {
  if (!str || !str.length) {
    throw new Error('splitToArray() > Please provide arr');
  }

  const regex = new RegExp(`${delimiter}|\s+${delimiter}\s+`, 'g');

  return str
    .split(regex)
    .reduce((result, item) => (item ? result.concat(item.trim()) : result), []);
}
