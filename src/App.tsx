import React from 'react';
import Button from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon';
// 第二种导入icon的方式
// fas是这个类型icon的所有集合
library.add(fas);
function App() {
  return (
    <div className="App">
      <Menu>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>three</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>drop1</MenuItem>
          <MenuItem>drop2</MenuItem>
        </SubMenu>
        <SubMenu title="opened">
          <MenuItem>opened1</MenuItem>
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

      <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
      <Icon icon="coffee" size="2x" theme="primary"></Icon>
    </div>
  );
}

export default App;
