import React, {useEffect, useState} from 'react';
import { Table, Button, Input, Typography } from 'antd';
import {FileTwoTone, FolderTwoTone, FileImageTwoTone, VideoCameraTwoTone, FileTextOutlined,
  CloudUploadOutlined, CloudDownloadOutlined, SelectOutlined, ShareAltOutlined, StarOutlined,
  AppleOutlined, FilePdfTwoTone, FileWordTwoTone, FileExcelTwoTone, FilePptTwoTone, ProjectOutlined} from '@ant-design/icons'
// @ts-ignore
import ToolBar from '/@components/ToolBar'
// @ts-ignore
import Responsive from '/@components/Responsive'
// @ts-ignore
import naturalSort from '/@lib/naturalSort.js'
import './tableList.less'

const { Paragraph } = Typography;

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
      icon = <FileImageTwoTone style={baseStyle} twoToneColor="#36cfc9"/>
      break
    case "video":
      icon = <VideoCameraTwoTone style={baseStyle} twoToneColor="#cf1322"/>
      break
    case "txt":
      icon = <ProjectOutlined style={baseStyle}/>
      break
    case "pdf":
      icon = <FilePdfTwoTone style={{...baseStyle}} twoToneColor="#cf1322"/>
      break
    case "doc":
      icon = <FileWordTwoTone style={{...baseStyle}}/>
      break
    case "ppt":
      icon = <FilePptTwoTone style={{...baseStyle}} twoToneColor="#f759ab"/>
      break
    case "xls":
      icon = <FileExcelTwoTone style={{...baseStyle}} twoToneColor="#52c41a"/>
      break
    case "code":
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
        {useIcon(record)}
        <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>
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
    },
    responsive: ['md']
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
    <Button icon={<CloudUploadOutlined />} type="primary"><Responsive breakPoint="md">上传</Responsive></Button>
    <Search className="input" placeholder="搜索您的文件"/>
  </>

  const toolBar2 = <>
    <div className="toolBar2">
      <Button icon={<CloudDownloadOutlined />} type="primary"><Responsive breakPoint="md">下载</Responsive></Button>
      <Button icon={<SelectOutlined />}><Responsive breakPoint="md">预览</Responsive></Button>
      <Button icon={<ShareAltOutlined />}><Responsive breakPoint="md">分享</Responsive></Button>
      <Button icon={<StarOutlined />}><Responsive breakPoint="md">收藏</Responsive></Button>
    </div>
    <Responsive breakPoint="md"><Button icon={<AppleOutlined />}>在iina中打开</Button></Responsive>
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
          onClick: () => {
            delete window['timer']
            // @ts-ignore
            setSelectedRowKeys([record.key])
            // @ts-ignore
            if (!window['clicked']) {
              // @ts-ignore
              if (selectedRowKeys.includes(record.key) && selectedRowKeys.length === 1) {
                window['timer'] = setTimeout(() => {
                  if (window['timer']) setSelectedRowKeys([])
                  delete window['timer']
                }, 220)
              }
              window['clicked'] = 1
              setTimeout(() => {
                delete window['clicked']
              }, 220)
            } else {
              delete window['clicked']
              if (window['timer']) {
                delete window['timer']
              }
              if (record.type === 'dir') {
                pathChange(record)
              } else {
                preview(record)
              }
            }
          }
        }
      }} loading={loading} pagination={false}/>
    </div>
  );
}

export default TableList;
