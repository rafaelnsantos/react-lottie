/* eslint-disable react/display-name */
import React, {
  useMemo,
  useState,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
} from 'react';
import lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web';

interface LottieParams extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  source: AnimationConfigWithData['animationData'];
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  animationRef?: MutableRefObject<AnimationItem | undefined> | ((anim: AnimationItem) => void);
}

export const Lottie = ({
  source,
  autoPlay = false,
  loop = true,
  speed = 1,
  animationRef,
  ...props
}: LottieParams): JSX.Element => {
  const [element, setElement] = useState<Element | null>();

  const anim = useMemo(
    () =>
      lottie.loadAnimation?.({
        animationData: source,
        autoplay: autoPlay,
        loop: loop,
        container: element as Element,
      }),
    [element]
  );

  useEffect(() => {
    anim.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    if (animationRef) {
      if (typeof animationRef === 'function') {
        animationRef(anim);
      } else {
        animationRef.current = anim;
      }
    }
  }, [anim]);

  return <div ref={(c) => setElement(c)} {...props}></div>;
};
