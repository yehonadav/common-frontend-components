import { uuid } from './uuid'

type AsyncID = string;

type AsyncItem = {
  id: AsyncID;
  call: () => Promise<any>;
  promise?: Promise<any>;
  prevId?: AsyncID;
  nextId?: AsyncID;
};

type AsyncBuffer = {
  items: Record<AsyncID, AsyncItem>;
  currentId?: AsyncID;
  lastId?: AsyncID;
  isRunning: boolean;
}

export const createAsyncBuffer = () => {
  const asyncBuffer:AsyncBuffer = {
    items: {},
    isRunning: false,
  };

  const getAsyncItem = (id: AsyncID) => {
    return asyncBuffer.items[id];
  }

  const executeAsyncItem = async (item: AsyncItem) => {
    item.promise = item.call();
    try { await item.promise } catch (e) {console.error({'executeAsyncItems.executeAsyncItem.error':e})}
  }

  const getNextId = (item: AsyncItem):AsyncID|undefined => {
    delete asyncBuffer.items[item.id];

    if (item.nextId) {
      delete asyncBuffer.items[item.nextId].prevId;
      return item.nextId;
    }

    return undefined;
  }

  const executeAsyncItems = async () => {
    if ([
      asyncBuffer.isRunning,
      !asyncBuffer.currentId,
      !asyncBuffer.lastId,
    ].some(i => i))
      return;

    asyncBuffer.isRunning = true;

    while (asyncBuffer.currentId) {
      const item = getAsyncItem(asyncBuffer.currentId);
      await executeAsyncItem(item);
      asyncBuffer.currentId = getNextId(item);
    }

    asyncBuffer.lastId = undefined;
    asyncBuffer.isRunning = false;
  }

  const runAsyncInOrder = (call:AsyncItem['call']):void => {
    // create async item
    const nextItem: AsyncItem = { id: uuid(), call };
    asyncBuffer.items[nextItem.id] = nextItem;

    // add item to buffer
    if (asyncBuffer.lastId) {
      const prevItem = getAsyncItem(asyncBuffer.lastId);
      nextItem.prevId = prevItem.id;
      prevItem.nextId = nextItem.id;
      asyncBuffer.lastId = nextItem.id;
    }

    // execute buffer
    else {
      asyncBuffer.currentId = nextItem.id;
      asyncBuffer.lastId = nextItem.id;
      executeAsyncItems();
    }
  }

  return runAsyncInOrder
}
