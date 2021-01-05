// @ts-ignore
import axios from '/@lib/axios'
// @ts-ignore
import naturalSort from '/@lib/naturalSort.js'
import {FileImageTwoTone, FileTextTwoTone, FileTwoTone, FolderTwoTone, VideoCameraTwoTone} from "@ant-design/icons";
import React from "react";

const useType = (record) => {
  const match = (name, types: string[]) => {
    for (let each of types) {
      if (name.match(RegExp(each + "$"))) {
        return true
      }
    }
    return false
  }
  let type = "unknown" // 默认为未知
  if (!record.url) type = "dir"  // 文件夹
  else if (match(record.name, ['png', 'jpg', 'bmp'])) type = "img"  // 图片
  else if (match(record.name, ['txt'])) type = "txt"  // txt文本
  else if (match(record.name, ['mp4', 'flv'])) type = "video"  // 视频
  else if (match(record.name, ['pdf'])) type = "pdf"  // PDF
  else if (match(record.name, ['doc', 'docx'])) type = "doc"  // doc
  else if (match(record.name, ['ppt', 'pptx'])) type = "ppt"  // ppt
  else if (match(record.name, ['xls', 'xlsx'])) type = "xls"  // xls
  else if (match(record.name, ['js', 'ts', 'html', 'css', 'less', 'scss', 'styl'])) type = "code"  // xls
  return type
}

export const getData = async (path) => {
  let res = await axios.post('/', {
    path
  })
  if (res.files) {
    const fileData = res.files.map((item, index) => {
      return {...item, key: index, type: useType(item)}
    })
    return fileData
  }
}
