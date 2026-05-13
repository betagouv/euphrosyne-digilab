export interface BasicAuthCredentials {
  username: string;
  password: string;
}

export function parseBasicAuthHeader(
  authHeader: string | null,
): BasicAuthCredentials | null {
  const basicAuthMatch = authHeader?.match(/^Basic\s+(.+)$/i);
  if (!basicAuthMatch) return null;

  const base64Credentials = basicAuthMatch[1].trim();
  if (!base64Credentials) return null;

  try {
    return parseBasicAuthCredentials(atob(base64Credentials));
  } catch {
    return null;
  }
}

export function parseBasicAuthCredentials(
  credentials: string,
): BasicAuthCredentials | null {
  const separatorIndex = credentials.indexOf(":");
  if (separatorIndex < 0) return null;

  return {
    username: credentials.slice(0, separatorIndex),
    password: credentials.slice(separatorIndex + 1),
  };
}
