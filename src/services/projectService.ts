import { Project } from "@/types/project";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch("https://api.kremilly.com/github?user=kremilly");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data: Project[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
