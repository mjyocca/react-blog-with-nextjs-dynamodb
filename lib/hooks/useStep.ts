import { useState, useCallback } from 'react';

type stepConfig<T> = {
  steps: T[] | number;
  initialStep?: T | number;
};

type Navigation = {
  previous: () => {};
  next: () => {};
};

type useStepReturn<T> = {
  step?: T;
  navigation: Navigation;
  index: number;
};

type internalState<T> = {
  index: number;
  currentStep: T;
  allSteps?: T[];
};

const createNavigation = (setState: any) => {
  return {
    next: () => {},
    previous: () => {},
  };
};

const getIndex = (steps: any, initialStep: any) => {
  if (typeof steps === 'object') {
    return steps.findIndex((s: any) => {
      return true;
    });
  } else {
  }
};

// : useStepReturn<T>
export const useStep = <T>({ steps, initialStep = 0 }: stepConfig<T>) => {
  const [state, setState] = useState(() => {
    let _state: Partial<internalState<T>> = {};
    if (typeof steps === 'number') {
      _state[`index`] = 0;
    } else {
      let initialStepIdx = typeof initialStep === 'number' ? steps[initialStep] : getIndex(steps, initialStep);
    }
    return _state;
  });

  const navigation = useCallback(() => createNavigation(setState), []);

  return {
    step: state.currentStep,
    index: state.index,
    navigation,
  };
};
