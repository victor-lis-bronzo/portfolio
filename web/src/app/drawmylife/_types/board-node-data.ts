export interface BoardNodeData {
  id: string;
  x: number;
  y: number;
  type: 'bot' | 'user';
  text: string;
  svg?: string;
}