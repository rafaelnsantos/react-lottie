import React, {
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useRef,
} from 'react';
import lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web';

interface LottieParams extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  source: AnimationConfigWithData['animationData'];
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  animationRef?: MutableRefObject<AnimationItem | undefined> | ((anim: AnimationItem) => void);
  onLoaded?: (anim: AnimationItem) => void;
}

export const Lottie = ({
  source,
  autoPlay = false,
  loop = true,
  speed = 1,
  animationRef,
  onLoaded,
  ...props
}: LottieParams): JSX.Element => {
  const animRef = useRef<AnimationItem>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      animationData: source,
      autoplay: autoPlay,
      loop: loop,
      container: divRef.current as Element,
    });

    if (animationRef) {
      if (typeof animationRef === 'function') {
        animationRef(animRef.current);
      } else {
        animationRef.current = animRef.current;
      }
    }

    animRef.current.setSpeed(speed);

    if (onLoaded) onLoaded(animRef.current);
  }, []);

  return <div ref={divRef} {...props}></div>;
};

export type { AnimationItem };
