import userEvent from '@testing-library/user-event';
import { Menu, MenuProps } from './menu';
import { MenuItem } from './menuItem';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
/**
 * 定义测试的props
 */
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};
const testVerProps: MenuProps = {
  defaultIndex: '2',
  mode: 'vertical',
};

/**
 * 定一个一个接收props，生成测试组件的函数
 */
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>three</MenuItem>
    </Menu>
  );
};

describe('test Menu and Menuitem component', () => {
  // 每个测试用例执行之前执行
  beforeEach(() => {});

  it('should render correct Menu and MenuItem components beas on default props', () => {
    render(generateMenu(testProps));
    const menuElement = screen.getByTestId('test-menu');
    // 是否在当前documentzhong
    expect(menuElement).toBeInTheDocument();
    const acitvieElemrnt = screen.getByText('active');
    expect(acitvieElemrnt).toHaveClass('menu-item is-active');
    const disabeldElement = screen.getByText('disabled');
    expect(disabeldElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    render(generateMenu(testProps));
    // 测试点击 一个正常的元素
    const threeEle = screen.getByText('three');
    fireEvent.click(threeEle);
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    expect(threeEle).toHaveClass('menu-item is-active');

    // 测试点击 一个disable元素
    const disabledEle = screen.getByText('disabled');
    userEvent.click(disabledEle);
    expect(disabledEle).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  afterEach(() => {});
});
