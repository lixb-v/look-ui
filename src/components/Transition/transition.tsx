import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean; // wrapper是为了防止传入的节点，自带的transform属性覆盖掉动画的transform属性
  children?: React.ReactNode;
};
export const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    appear = true,
    unmountOnExit = true,
    ...restProps
  } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      appear={appear}
      unmountOnExit={unmountOnExit}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
