
export interface Project {
  id: string;
  title: string;
  description: string;
  readMoreUrl: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves';
}
