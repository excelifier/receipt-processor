export interface JobItem {
  uuid: string;
  org_id: string;
  created_at: string;
  success: boolean;
  filename: string;
  pages: number;
  processing: boolean;
  price: number;
  type: string;
  ocr: boolean;
  deleted: boolean;
  fail_reason: string | null;
}

export interface OriginalFileResponse {
  download_url: string;
  valid_for_seconds: string;
}