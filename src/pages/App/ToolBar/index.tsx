import React from 'react';
import {Button, Input} from 'antd'
import './toolBar.less'

const { Search } = Input;

function ToolBar(props) {
  return (
    <div className="toolBar">
      <Button type="primary">上传文件</Button>
      <Search className="input" placeholder="搜索您的文件"/>
    </div>
  );
}

export default ToolBar;
