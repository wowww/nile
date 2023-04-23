import { useEffect, useRef, useState } from "react";

export const useLazyImageObserver = (src: any) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let observer: any;

    if (imageRef && !imageSrc) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imageRef.current);
          }
        },
        { threshold: [0.25] },
      );
      console.log("observer!!", observer);
      observer.observe(imageRef.current);
    }
    return () => {
      observer && observer.disconnet(imageRef);
    };
  }, [imageRef, imageSrc, src]);
  return { imageSrc, imageRef };
};
