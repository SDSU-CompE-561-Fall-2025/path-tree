export type MeResponse = {
  id: number;
  email: string;
  name: string;
  created_at: string;
};

export type AccountOut = MeResponse;

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};
