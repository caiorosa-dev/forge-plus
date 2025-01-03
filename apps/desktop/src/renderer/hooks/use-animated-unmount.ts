import { useEffect, useRef, useState } from "react";

export function useAnimatedUnmount(
  visible: boolean,
  animationName?: string
) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refElement: any = animatedElementRef.current;

    function handleAnimationEnd(event: AnimationEvent) {
      if (animationName && event.animationName !== animationName) return;

      setShouldRender(false);
    }

    if (!visible && refElement) {
      refElement.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [animationName, visible]);

  return { shouldRender, animatedElementRef };
}
