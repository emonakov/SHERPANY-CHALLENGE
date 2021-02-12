export const getDefaultNat = (): string => {
  return (
    localStorage.getItem('nat') ??
    String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT)
  );
};
