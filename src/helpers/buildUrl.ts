export const buildUrl = (
  endpoint: string,
  params: Record<string, unknown>,
): string => {
  let endpointUrl = endpoint;
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  endpointUrl += `?${queryString}`;

  return endpointUrl;
};
