export const removeUnChangedFields = <T=any>(newValues:T, oldValues:T):Partial<T> => {
  const changedFields:Partial<T> = {};

  Object.keys(newValues).forEach(key => {
    if (JSON.stringify(newValues[key]) !== JSON.stringify(oldValues[key]))
      changedFields[key] = newValues[key];
  });

  return changedFields;
}