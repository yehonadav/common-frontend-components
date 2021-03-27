// can only be used with async functions
// usage example: async function demo() {await sleep(2000)}
export const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

