type Header = {
  Authorization: string;
};

export function getAuthorizationHeader(token: string): Header {
  return {
    Authorization: `Bearer ${token}`,
  };
}
