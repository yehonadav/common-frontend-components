export type RemoveEmptyFieldsType = <T>(fields:T) => Partial<T>;
export type TgetChangedFields = <T>(originalValues:T, currentValues:Partial<T>) => Partial<T>;

export const removeEmptyFields
  :RemoveEmptyFieldsType = (fields) =>
{
  const data = {...fields}
  Object.keys(data).forEach(key=>{
    // @ts-ignore
    if (data[key] === "")
      { // @ts-ignore
        data[key] = undefined
      }
  });
  return data
}

export const getChangedFields
  :TgetChangedFields = (originalValues, currentValues) =>
{
  const data:any = {}

  Object.keys(currentValues).forEach(key=>{
    // @ts-ignore
    if (originalValues[key] !== currentValues[key])
    { // @ts-ignore
      data[key] = currentValues[key]
    }
  });

  return data
}