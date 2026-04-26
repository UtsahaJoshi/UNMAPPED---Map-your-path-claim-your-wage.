import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { SCENE_FRAMES } from './constants';
import { Scene01Title } from './scenes/Scene01Title';
import { Scene03Architecture } from './scenes/Scene03Architecture';
import { Scene04TechStack } from './scenes/Scene04TechStack';
import { Scene06NegativeSpace } from './scenes/Scene06NegativeSpace';
import { Scene07ClaudeEcosystem } from './scenes/Scene07ClaudeEcosystem';
import { Scene09Closing } from './scenes/Scene09Closing';

const T = SCENE_FRAMES.transition;

const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: T })}
  />
);

export const Main = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s1}>
        <Scene01Title />
      </TransitionSeries.Sequence>
      {transition}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s2}>
        <Scene03Architecture />
      </TransitionSeries.Sequence>
      {transition}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s3}>
        <Scene04TechStack />
      </TransitionSeries.Sequence>
      {transition}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s4}>
        <Scene06NegativeSpace />
      </TransitionSeries.Sequence>
      {transition}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s5}>
        <Scene07ClaudeEcosystem />
      </TransitionSeries.Sequence>
      {transition}
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s6}>
        <Scene09Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
