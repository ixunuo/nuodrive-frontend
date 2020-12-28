import React, {useState} from 'react';
import { Table, Button, Input} from 'antd';
import {FileTwoTone, FolderTwoTone, FileImageTwoTone, FileTextTwoTone, VideoCameraTwoTone, FileTextOutlined} from '@ant-design/icons'
import './tableList.less'
// @ts-ignore
import ToolBar from '/@components/ToolBar'

const useIcon = (record) => {
  const baseStyle = { fontSize: 20, marginRight: 10 }
  let icon
  switch (record.type) {
    case "unknown":
      icon = <FileTwoTone style={baseStyle}/>
      break
    case "dir":
      icon = <FolderTwoTone style={baseStyle} twoToneColor="#d48806"/>
      break
    case "img":
      icon = <FileImageTwoTone style={baseStyle} twoToneColor="#f759ab"/>
      break
    case "video":
      icon = <VideoCameraTwoTone style={baseStyle} twoToneColor="#cf1322"/>
      break
    case "txt":
      icon = <FileTextOutlined style={{...baseStyle, color: "#595959"}}/>
      break
    default:
      icon = <FileTwoTone style={baseStyle}/>
  }
  return icon
}
const { Search } = Input

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    render: (text, record) => {
      return <div className="nameWrap">
        {useIcon(record)}{text}
      </div>
    }
  },
  {
    title: '大小',
    dataIndex: 'size',
    render: (text) => {
      let ret = Number(text)
      const unit = ['B', 'K', 'M', 'G']
      let i = 0
      while (i < 3 && ret > 1024) {
        ret = ret / 1024
        i++
      }
      return ret.toFixed(1) + unit[i]
    }
  },
  {
    title: '修改日期',
    dataIndex: 'time',
    render: (text) => {
      return (new Date(text)).toLocaleString('zh-CN', { hour12: false })
    }
  }
];

function TableList({ data, loading, pathChange, preview }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const hasSelected = selectedRowKeys.length > 0;
  const [showContextMenu, setShowContextMenu] = useState(false)
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toolBar1 = <>
    <Button type="primary">上传文件</Button>
    <Search className="input" placeholder="搜索您的文件"/>
  </>
  return (
    <div className="tableList">
      <ToolBar>
        <div  className="toolBar">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : toolBar1}
        </div>
      </ToolBar>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} onRow={(record, index) => {
        return {
          onDoubleClick: () => {
            if (record.type === 'dir') {
              pathChange(record)
            } else {
              preview(record)
            }
          },
          onClick: () => {
            // @ts-ignore
            if (selectedRowKeys.includes(index) && selectedRowKeys.length === 1) {
              setSelectedRowKeys([])
            } else {
              // @ts-ignore
              setSelectedRowKeys([index])
            }
          }
          // onContextMenu: (e) => {
          //   e.preventDefault()
          //   setShowContextMenu(showContextMenu => !showContextMenu)
          // }
        }
      }} loading={loading}/>
    </div>
  );
}

export default TableList;
