export interface Question {
  id: string;
  content: string;      // texte, URL d’image, SVG…
  author: string;
  votes: number;
  color?: string;       // ex. "#df4b26"
  x?: number;           // position sur le canevas
  y?: number;
  width?: number;       // taille
  height?: number;
}

export interface PublicEvent {
  id: number;
  name: string;
  questions: Question[];  // impératif pour la suite
}
