export function stringify(str?: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return null;
  }
  return str;
}

export const TRACKING_ID = stringify(process.env.TRACKING_ID);
