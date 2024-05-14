import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonType = 'default' | 'primary' | 'danger' | 'link';

export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
  className: string;
  children: React.ReactNode;
  typeName: ButtonType;
  size: ButtonSize;
  disabled: boolean;
  href: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    typeName = 'default',
    size,
    disabled = false,
    href,
    ...rest
  } = props;
  const btnClassName = classNames('btn', className, {
    [`btn-${typeName}`]: typeName,
    [`btn-${size}`]: size,
    disabled: disabled && typeName === 'link', // a标签需要使用类型的方式进行禁用，按钮有自带的属性
  });

  if (typeName === 'link') {
    return (
      <a href={href} className={btnClassName} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={btnClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
