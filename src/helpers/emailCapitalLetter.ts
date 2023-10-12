export const InvertToUppercast = (param: string): string => {
  const upperCasedEmail =
    param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
  return upperCasedEmail;
};
