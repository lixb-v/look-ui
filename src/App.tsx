import React from 'react';
import Button from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
function App() {
  return (
    <div className="App">
      <Menu>
        <MenuItem>menu-1</MenuItem>
        <MenuItem disabled>menu-2</MenuItem>
        <MenuItem>menu-3</MenuItem>
        <SubMenu title="测试submenu">
          <MenuItem>menu-4</MenuItem>
          <MenuItem>menu-5</MenuItem>
        </SubMenu>
      </Menu>

      <Button typeName="primary" size="lg" autoFocus>
        Hello-primary-lg
      </Button>
      <Button typeName="default">Hello-default-default</Button>
      <Button typeName="danger" size="sm">
        Hello-danger-sm
      </Button>
      <Button typeName="link" size="sm">
        Hello-link-sm
      </Button>
    </div>
  );
}

export default App;
