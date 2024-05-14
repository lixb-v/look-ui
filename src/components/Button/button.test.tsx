import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './Button';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  typeName: 'primary',
  size: 'lg',
  className: 'test',
  onClick: jest.fn(),
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const linkProps: ButtonProps = {
  typeName: 'link',
  href: 'http://www.baidu.com',
  target: '_blank',
};

describe('test Button components', () => {
  test('render default button', async () => {
    render(<Button {...defaultProps}>default</Button>);

    // 通过文字获取元素
    const ele = screen.getByText('default') as HTMLButtonElement;

    // 判断元素是否在当前文档中
    expect(ele).toBeInTheDocument();

    // 判断元素是否是BUTTON标签
    expect(ele.tagName).toEqual('BUTTON');

    // 判断元素的类名
    expect(ele).toHaveClass('btn btn-default');

    // 判断disable是false属性
    expect(ele.disabled).toBeFalsy();

    // 模拟点击时间
    fireEvent.click(ele);
    // 判断点击事件，是否被触发
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test('should render the correct component based on different props', () => {
    render(<Button {...testProps}>differentProps</Button>);
    const ele = screen.getByText('differentProps');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('btn btn-primary btn-lg test');
  });

  test('should render a link when btnType equals link and href is provided', () => {
    render(<Button {...linkProps}>link</Button>);
    const ele = screen.getByText('link');
    expect(ele).toBeInTheDocument();

    // 判断标签是否是A标签
    expect(ele.tagName).toEqual('A');

    expect(ele).toHaveClass('btn btn-link');

    // 获取属性
    expect(ele).toHaveAttribute('target', '_blank');
  });

  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const ele = screen.getByText('disabled');
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('BUTTON');

    // 判断disabled属性
    expect(ele).toBeDisabled();

    userEvent.click(ele);

    // 判断点击事件没有被触发
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
