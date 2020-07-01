# Lottie for React

[![npm Version](https://img.shields.io/npm/v/@rafaelns/react-lottie.svg)](https://www.npmjs.com/package/@rafaelns/react-lottie) [![License](https://img.shields.io/npm/l/@rafaelns/react-lottie.svg)](https://www.npmjs.com/package/@rafaelns/react-lottie)

Lottie component for React

Lottie is a library that parses [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) animations exported as JSON with [bodymovin](https://github.com/bodymovin/bodymovin) and renders them natively!

For the first time, designers can create **and ship** beautiful animations without an engineer painstakingly recreating it by hand.

## Installing

Install `@rafaelns/react-lottie`:

```bash
yarn add @rafaelns/react-lottie
```

or

```bash
npm i --save @rafaelns/react-lottie
```

## Usage

LottieView can be used in a declarative way:

```jsx
import React from 'react';
import Lottie from '@rafaelns/react-lottie';
import animation from './animation.json'

export const BasicExample = () => {
  return <Lottie source={animation} autoPlay loop />;
}
```

Additionally, there is an imperative API which is sometimes simpler.

```jsx
import React, { useRef, useEffect } from 'react';
import Lottie, { AnimationItem } from '@rafaelns/react-lottie';
import animation from '../path/to/animation.json'

export const BasicExample = () => {
  const animationRef = useRef<AnimationItem>()
  
  useEffect(() {
    animationRef.current.play();
    // Or set a specific startFrame and endFrame with:
    animationRef.current.play(30, 120);
  }, [])

  return (
    <Lottie
      animationRef={animationRef}
      source={animation}
    />
  );
}
```

## API

You can find the full list of methods available in [API document](https://github.com/airbnb/lottie-web#usage).

| Prop           | Description                                                                                                                                                                                                                                                                     | Default                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`source`**   | **Mandatory** - The source of animation. JS object of an animation. | _None_                                                                                                              |
| **`style`**    | Style attributes for the view, as expected in a standard [`View`](https://facebook.github.io/react-native/docs/layout-props.html).                                                                                                                                              | The `aspectRatio` exported by Bodymovin will be set. Also the `width` if you haven't provided a `width` or `height` |
| **`loop`**     | A boolean flag indicating whether or not the animation should loop.                                                                                                                                                                                                             | `true`                                                                                                              |
| **`autoPlay`** | A boolean flag indicating whether or not the animation should start automatically when mounted.                                                                                                                                          | `false`                                                                                                             |
| **`speed`** | The speed the animation will progress. Sending a negative value will reverse the animation.                                                                                                                                           | `1`                                                                                                             |

And any other div props.
