export interface BoardNodeData {
  id: string;
  x: number;
  y: number;
  type: 'bot' | 'user';
  text: string;
  svg?: string;
  layout?: 'col' | 'col-reverse' | 'row' | 'row-reverse';
  color?: string;
}