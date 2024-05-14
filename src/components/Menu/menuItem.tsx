import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, style, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  });

  const handleClick = () => {
    if (context.onSelect && typeof index === 'number') {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
