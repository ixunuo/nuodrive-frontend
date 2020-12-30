import React, {useEffect, useState} from 'react';
import { Table, Button, Input} from 'antd';
import {FileTwoTone, FolderTwoTone, FileImageTwoTone, VideoCameraTwoTone, FileTextOutlined,
  CloudUploadOutlined, CloudDownloadOutlined, SelectOutlined, ShareAltOutlined, StarOutlined, AppleOutlined} from '@ant-design/icons'
// @ts-ignore
import ToolBar from '/@components/ToolBar'
// @ts-ignore
import naturalSort from '/@lib/naturalSort.js'
import './tableList.less'

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
    },
    sorter: {
      compare: (a, b) => {
        let ret = 0
        if (a && a.type === 'dir') {
          ret -= 100
        }
        if (b && b.type === 'dir') {
          ret += 100
        }
        return ret + naturalSort(a.name.replace(/^第/, ""), b.name.replace(/^第/, ""))
      }
    },
    defaultSortOrder: "ascend"
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
    },
    sorter: {
      compare: (a, b) => {
        let ret = 0
        if (a && a.type === 'dir') {
          ret -= 100
        }
        if (b && b.type === 'dir') {
          ret += 100
        }
        return a.size - b.size
      }
    }
  },
  {
    title: '修改日期',
    dataIndex: 'time',
    render: (text) => {
      return (new Date(text)).toLocaleString('zh-CN', { hour12: false })
    },
    sorter: {
      compare: (a, b) => {
        return Number(new Date(a.time)) - Number(new Date(b.time))
      }
    }
  }
];

function TableList({ data, loading, pathChange, preview }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    if (loading) setSelectedRowKeys([])
  }, [loading])

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const toolBar1 = <>
    <Button icon={<CloudUploadOutlined />} type="primary">上传</Button>
    <Search className="input" placeholder="搜索您的文件"/>
  </>

  const toolBar2 = <>
    <div className="toolBar2">
      <Button icon={<CloudDownloadOutlined />} type="primary">下载</Button>
      <Button icon={<SelectOutlined />}>预览</Button>
      <Button icon={<ShareAltOutlined />}>分享</Button>
      <Button icon={<StarOutlined />}>收藏</Button>
    </div>
    {/*<Button icon={<AppleOutlined />}>在iina中打开</Button>*/}
    {/*<Search className="input" placeholder="搜索您的文件"/>*/}
  </>
  return (
    <div className="tableList">
      <ToolBar>
        <div  className="toolBar">
          {hasSelected ? toolBar2 : toolBar1}
        </div>
      </ToolBar>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} onRow={(record) => {
        return {
          onDoubleClick: (e) => {
            if (window['timer']) {
              delete window['timer']
            }
            if (record.type === 'dir') {
              pathChange(record)
            } else {
              preview(record)
            }
          },
          onClick: () => {
            // @ts-ignore
            if (selectedRowKeys.includes(record.key) && selectedRowKeys.length === 1) {
              window['timer'] = setTimeout(() => {
                if (window['timer']) setSelectedRowKeys([])
                delete window['timer']
              }, 250)
            } else {
              // @ts-ignore
              setSelectedRowKeys([record.key])
              delete window['timer']
              // window['timer'] = setTimeout(() => {
              //   // @ts-ignore
              //   if (window['timer']) setSelectedRowKeys([record.key])
              //   delete window['timer']
              // }, 250)
            }
          }
        }
      }} loading={loading} pagination={false}/>
    </div>
  );
}

export default TableList;
