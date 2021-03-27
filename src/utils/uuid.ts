const id = {n:0};

export function uuid() {
  id.n++;
  return id.n.toString()
}

export class uuid_generator {
  private id: number;
  constructor() {this.id = 0}
  create = () => {this.id++; return this.id};
  create_many = (amount: number) => {const ids = [];for(let i=0;i<amount;i++)ids.push(this.create());return ids;}
}

export const key_prop = new uuid_generator();
export const new_key = key_prop.create;
export const new_keys = key_prop.create_many;
