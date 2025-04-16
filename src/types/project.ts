
export interface Project {
  forks: number;
  stars: number;
  url: string;
  name: string;
  id: string;
  title: string;
  description: string;
  readMoreUrl: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves';
  tags?: string[];
}
