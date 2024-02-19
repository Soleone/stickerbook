export interface Asset {
  created_at: string | null;
  description: string | null;
  id?: string;
  image_url: string | null;
  metadata: object | null;
  name: string | null;
  status: string;
  token_address: string;
  token_id: string;
  updated_at: string | null;
  uri: string | null;
  user: string;
}