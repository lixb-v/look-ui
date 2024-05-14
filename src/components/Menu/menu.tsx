import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  // 默认 active 菜单项的索引值
  defaultIndex?: string;
  className?: string;
  // 菜单类型，横向或纵向
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('look-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setActive(index);
    typeof onSelect === 'function' && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    mode,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          'Warnig: Menu has a child which is no a MenuItem component'
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
