

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  num?: string |null;
  img?: string| null;
  label?: string| null;
  box?: any| null;

  id: string;
  linkCount: number = 0;

  constructor(id,img,label) {
    this.id = id;
    this.img = img;
    this.label = label;
    this.box = {}
  }

  normal = () => {
    return Math.sqrt(this.linkCount / 2);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    let index = Math.floor( this.normal());
    return "blue"
  }
}
