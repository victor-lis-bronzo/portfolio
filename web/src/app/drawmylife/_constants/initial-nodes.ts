import { BoardNodeData } from "../_types";

export const INITIAL_NODES: BoardNodeData[] = [
  {
    id: "intro-node",
    x: -280, // Offset para centralizar visualmente baseado no centro da tela
    y: -60,
    type: "bot",
    text: "Olá! Eu sou o mascote do Victor Lis Bronzo.\nClique em qualquer lugar deste quadro para me perguntar\nsobre a carreira, projetos ou habilidades dele!",
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 20 A 30 30 0 0 1 80 50 A 30 30 0 0 1 50 80 A 30 30 0 0 1 20 50 A 30 30 0 0 1 50 20 Z" /><circle cx="35" cy="45" r="4" fill="currentColor"/><circle cx="65" cy="45" r="4" fill="currentColor"/><path d="M40 65 Q 50 75 60 65" /></svg>`,
  },
];
