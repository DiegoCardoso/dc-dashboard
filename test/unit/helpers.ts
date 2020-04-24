export function waitAnimationFrame(): Promise<unknown> {
  return new Promise(resolve => {
    requestAnimationFrame(() => resolve());
  });
}
