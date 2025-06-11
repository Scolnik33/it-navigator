import { useRef } from "react";

export function useCloseButtonRef() {
  return useRef<HTMLButtonElement>(null!);
}
