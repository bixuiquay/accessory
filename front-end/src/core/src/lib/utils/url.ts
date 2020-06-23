export const ACTION_EDIT = 'edit';

export const URL_NEW = 'new';
export const URL_EDIT = `:id/${ACTION_EDIT}`;
export const URL_DETAIL = ':id';

/**
 * Get new item url. Ex: sport-centers/new
 *
 * @param  {string} endpoint  The endpoint
 * @return {string}
 */
export const getNewItemUrl = (endpoint: string): string => {
  return `${endpoint}/${URL_NEW}`;
}

/**
 * Get new item url. Ex: sport-centers/9652e0e3-0130-4345-8595-b6df891bb179
 *
 * @param  {string} endpoint  The endpoint
 * @param  {string} id        The item id
 * @return {string}
 */
export const getViewItemUrl = (endpoint: string, id: string): string => {
  return `${endpoint}/${id}`;
}

/**
 * Get new item url. Ex: sport-centers/9652e0e3-0130-4345-8595-b6df891bb179/edit
 *
 * @param  {string} endpoint  The endpoint
 * @param  {string} id        The item id
 * @return {string}
 */
export const getEditItemUrl = (endpoint: string, id: string): string => {
  return `${endpoint}/${id}/${ACTION_EDIT}`;
}

/**
 * Get new item url. Ex: sport-centers/9652e0e3-0130-4345-8595-b6df891bb179
 *
 * @param  {string} endpoint  The endpoint
 * @param  {string} id        The item id
 * @return {string}
 */
export const getViewSubUrl = (item:string,endpoint: string, id: string): string => {
  return `${item}/${endpoint}/${id}`;
}