import { Project } from "@/types/project";

const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

interface CacheData {
  data: Project[];
  timestamp: number;
}

const getCachedProjects = (): Project[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData: CacheData = JSON.parse(cached);
    const now = Date.now();

    // Verificar se o cache ainda é válido
    if (now - cacheData.timestamp < CACHE_DURATION) {
      console.log('📦 Loading projects from cache');
      return cacheData.data;
    }

    // Cache expirado, remover
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

const setCachedProjects = (projects: Project[]): void => {
  try {
    const cacheData: CacheData = {
      data: projects,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('💾 Projects cached successfully');
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  // Primeiro, tentar carregar do cache
  const cachedProjects = getCachedProjects();
  if (cachedProjects) {
    return cachedProjects;
  }

  try {
    console.log('🌐 Fetching projects from API...');
    const response = await fetch("https://api.kremilly.com/github?user=kremilly");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data: Project[] = await response.json();
    
    // Salvar no cache
    setCachedProjects(data);
    
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Em caso de erro, tentar retornar cache expirado como fallback
    const expiredCache = getCachedProjects();
    if (expiredCache) {
      console.log('⚠️ Using expired cache as fallback');
      return expiredCache;
    }
    
    return [];
  }
};

// Função para limpar o cache manualmente
export const clearProjectsCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Projects cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Função para forçar atualização (ignorar cache)
export const forceFetchProjects = async (): Promise<Project[]> => {
  clearProjectsCache();
  return fetchProjects();
};
