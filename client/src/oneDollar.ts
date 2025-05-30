// src/oneDollar.ts
export default class OneDollar {
  constructor(_opts: any) {}
  add(_name: string, _pts: number[][]) {
    // no-op
  }
  check(pts: number[][]) {
    if (pts.length < 2) return { recognized: false }
    const first = pts[0][0], last = pts[pts.length - 1][0]
    // if you swipe mostly left→right
    if (last - first > 0.1) return { recognized: true, name: '>' }
    // swipe right→left
    if (first - last > 0.1) return { recognized: true, name: '<' }
    return { recognized: false }
  }
}
