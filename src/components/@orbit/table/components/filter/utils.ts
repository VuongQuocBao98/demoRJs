export const getSelectDisplayText = (
  value: any,
  options: ({ [key: string]: any } | string)[],
  valueKey: string,
  displayKey: string
) => {
  const isObjectOption = typeof options[0] === 'object';

  if (!isObjectOption) return value;

  const typedOpts = options as { [key: string]: any }[];

  const dpOpt = typedOpts.find((opt) => opt[valueKey] === value);
  return dpOpt ? dpOpt[displayKey] : 'unknown';
};
