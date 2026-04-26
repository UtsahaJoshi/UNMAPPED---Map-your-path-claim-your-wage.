import { Composition } from 'remotion';
import { Main } from './Main';
import { Main as DemoMain } from './demo/Main';
import { TOTAL_FRAMES } from './constants';
import { DEMO_TOTAL_FRAMES } from './demo/DemoConstants';

export const Root = () => (
  <>
    <Composition
      id="UNMAPPED"
      component={Main}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="UNMAPPED-Demo"
      component={DemoMain}
      durationInFrames={DEMO_TOTAL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
