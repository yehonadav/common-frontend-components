import { storageFactory } from "storage-factory";

export const local = storageFactory(() => localStorage);
export const session = storageFactory(() => sessionStorage);

export const getStorage = (storage:Storage):Record<string, any> => {

  const result:Record<string, any> = {};

  Object.keys(storage).forEach(k => {
    const value = storage.getItem(k);
    result[k] = value ? JSON.parse(value) : value;
  })

  return result
}

export const setStorageItem = <T=any>(storage:Storage, uuid: string, data: T):void => {storage.setItem(uuid, JSON.stringify({data}))};

export const getStorageItem = <T=any>(storage:Storage, uuid: string):T => {
  const value = storage.getItem(uuid);

  if (value === null)
    throw Error(`getStorageItemValueError: storage.getItem('${uuid}') did not return a value`);

  return JSON.parse(value).data
};

export const delStorageItem = (storage:Storage, uuid: string):void => {
  // eslint-disable-next-line no-empty
  try{storage.removeItem(uuid)}catch(e){}
};