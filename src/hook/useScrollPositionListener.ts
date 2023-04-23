import { useCallback, useEffect, useRef } from "react";

/**
 * @description 콜백함수에서 스크롤 x, y 값을 받아서 컴포넌트 내부 상태를 업데이트 할 수 있도록 하는 훅
 * @param {Function} listener - 스크롤 변경시 실행할 콜백함수
 * @param {unknown[]} deps - 콜백함수의 의존값 배열
 */
const useScrollPositionListener = <T extends Event>(
  listener: (scrollPosition: { x: number; y: number }, event?: T) => void,
  deps: readonly unknown[] = [],
) => {
  const rafRef = useRef(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(listener, deps);

  useEffect(() => {
    if (!callback) return;

    const getScrollPosition = () => ({ x: window.pageXOffset, y: window.pageYOffset });

    // 담고 안담고의 차이
    const handleEvent = (event: T) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        callback(getScrollPosition(), event);
      });
    };

    // callback(getScrollPosition());
    window.addEventListener("scroll", handleEvent as EventListener);

    return () => window.removeEventListener("scroll", handleEvent as EventListener);
  }, [callback]);
};

export default useScrollPositionListener;
