import userEvent from '@testing-library/user-event';
import { Menu, MenuProps } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
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
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

/**
 * 定义加载style函数
 */
const createStyleFile = () => {
  const cssFile: string = `
    .look-submenu {
      display: none;
    }
    .look-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

describe('test Menu and Menuitem component', () => {
  // 每个测试用例执行之前执行
  beforeEach(() => {
    document.body.append(createStyleFile());
  });

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
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    expect(threeEle).toHaveClass('menu-item is-active');

    // 测试点击 一个disable元素
    const disabledEle = screen.getByText('disabled');
    userEvent.click(disabledEle);
    expect(disabledEle).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  /**
   * 测试当鼠标移入 submenu时，显示子组件
   */
  it('should show dropdown items when hoever on subMenu', async () => {
    render(generateMenu(testProps));
    /**
     * 判断隐藏元素是否在页面上
     * toBeVisible： 在当前视野内，加上not就是不在视野内
     */
    expect(screen.getByText('drop1')).not.toBeVisible();

    /**
     * 鼠标移入subMenu，显示隐藏的子元素
     */
    const dropdownEle = screen.getByText('dropdown');
    userEvent.hover(dropdownEle);
    // 等待函数内的事件完成
    await waitFor(() => {
      expect(screen.getByText('drop1')).toBeVisible();
    });
    /**
     * 点击显示的子元素
     */
    fireEvent.click(screen.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    userEvent.unhover(dropdownEle);
    await waitFor(() => {
      expect(screen.getByText('drop1')).not.toBeVisible();
    });
  });
  afterEach(() => {});
});

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    document.body.append(createStyleFile());
  });
  it('should render vertical mode when mode is set to vertical', () => {
    render(generateMenu(testVerProps));
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('should show dropdown items when click on subMenu for vertical mode', async () => {
    render(generateMenu(testVerProps));
    // queryByText, 没找到元素会返回null
    const dropDownItem = screen.queryByText('drop1');
    // 没有显示在页面中
    expect(dropDownItem).not.toBeVisible();
    userEvent.click(screen.getByText('dropdown'));
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible();
    });
  });

  // 默认展开
  it('should show subMenu dropdown when defaultopenSubMenus contains SubMenu index', () => {
    render(generateMenu({ ...testVerProps, defaultOpenSubMenus: ['4'] }));
    expect(screen.queryByText('opened1')).toBeVisible();
  });
});
