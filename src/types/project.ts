
export interface Project {
  languages: string[];
  forks: number;
  stars: number;
  url: string;
  name: string;
  id: string;
  title: string;
  commits: number;
  issues: number;
  description: string;
  readMoreUrl: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves';
  tags?: string[];
}
