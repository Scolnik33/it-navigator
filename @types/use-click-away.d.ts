declare module "use-click-away" {
  export function useClickAway(
    ref: React.RefObject<HTMLElement> | HTMLElement,
    handler: (event: Event) => void
  ): void;
}
