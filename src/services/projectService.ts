
import { Project } from "@/types/project";

// Esta função simula uma chamada de API
// Em um cenário real, você substituiria isso por uma chamada fetch real
export const fetchProjects = async (): Promise<Project[]> => {
  // Simular um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simular dados retornados da API
  return [
    {
      id: "1",
      title: "Plank",
      description: "A functional programming language with a focus on simplicity and ease of use. Plank is a statically typed language with a syntax similar to Kotlin, and a compiler written in Kotlin...",
      readMoreUrl: "#plank",
      logoType: "lambda"
    },
    {
      id: "2",
      title: "Trazodone",
      description: "A LLVM backend for JVM that runs just-in-time compilation, and abstract the codegen into multiple steps to be easy to generate LLVM, Rust, or any target, and has a built-in evaluator...",
      readMoreUrl: "#trazodone",
      logoType: "lambda"
    },
    {
      id: "3",
      title: "Asena",
      description: "Incremental/single-pass based compiler, the API can be either used for Single-Pass Compiling and for building LSP, or things that would need incremental pipelines. Its a study project of mine for studying incremental compilers and package-managers...",
      readMoreUrl: "#asena",
      logoType: "lambda"
    },
    {
      id: "4",
      title: "TypeScript Analyzer",
      description: "Uma ferramenta para análise estática de código TypeScript, identificando padrões comuns e sugerindo melhorias de performance e segurança...",
      readMoreUrl: "#typescript-analyzer",
      logoType: "code"
    }
  ];
};
