export interface BlogDto {
  title: string;
  description: string;
  content: string;
  tags: string[];
  publishDate?: string;
  author?: string;
}
