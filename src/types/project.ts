
export interface Project {
  url: string;
  name: string;
  id: string;
  title: string;
  description: string;
  readMoreUrl: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves';
  tags?: string[];
}
