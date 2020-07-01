import React, {
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useRef,
} from 'react';
import lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web';

interface LottieParams
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
  source: AnimationConfigWithData['animationData'];
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  animationRef?: MutableRefObject<AnimationItem | undefined> | ((anim: AnimationItem) => void);
  onLoaded?: (anim: AnimationItem) => void;
}

const Lottie = ({
  source,
  autoPlay = false,
  loop = true,
  speed = 1,
  animationRef,
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
  }, []);

  return <div ref={divRef} {...props}></div>;
};

export type { AnimationItem };

export default Lottie;
