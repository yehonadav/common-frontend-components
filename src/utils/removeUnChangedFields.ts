export const removeUnChangedFields = <T=any>(newValues:T, oldValues:T):void => {
  Object.keys(newValues).forEach(key => {
    if (JSON.stringify(newValues[key]) === JSON.stringify(oldValues[key]))
      delete newValues[key];
  });
}