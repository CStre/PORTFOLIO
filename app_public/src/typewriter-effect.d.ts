declare module 'typewriter-effect/dist/core' {
  interface Options {
    loop?: boolean;
    delay?: number;
  }

  class Typewriter {
    constructor(element: string | HTMLElement, options?: Options);
    typeString(text: string): Typewriter;
    pauseFor(duration: number): Typewriter;
    deleteAll(speed?: number): Typewriter;
    start(): Typewriter;
  }

  export = Typewriter;
}
