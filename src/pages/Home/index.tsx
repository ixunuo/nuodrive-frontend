/***
 * author 许诺
 * 全部文件
 ***/

import React, {useState, useEffect} from 'react';
// @ts-ignore
import Breadcrumb from "/@components/Breadcrumb"
// @ts-ignore
import TableList from "/@components/TableList"
// @ts-ignore
import Preview from '/@components/Preview'
// @ts-ignore
import { getData } from './api.ts'
import { useHistory } from "react-router-dom";
import {Menu, Modal} from 'antd';
import './index.less'

function Home(props) {
  const history = useHistory();
  const [fileData, setFileData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [srcUrl, setSrcUrl] = useState('')
  const path = history.location.pathname.replace(/^\/home/, "")
  const pathChange = (record) => {
    history.push(history.location.pathname + '/' + record.name);
  }
  const preview = (record) => {
    // let url = 'http://downproxy.xunuo.ga?url=' + encodeURIComponent(record.url)
    // url = 'iina://open?url=' + encodeURIComponent(url)
    // window.open(url)
    // console.log(record)
    // history.push({
    //   pathname: '/preview' + path + '/' + record.name,
    //   state: record
    // })
    setSrcUrl('http://downproxy.xunuo.ga?url=' + encodeURIComponent(record.url))
    setShowPreview(true)
  }

  useEffect(() => {
    setLoading(true)
    getData(path).then(res => {
      setFileData(res)
      setLoading(false)
    })
  }, [path])

  return (
    <div className="home">
      <Modal title="预览" visible={showPreview} width="80vw"  centered={true} wrapClassName="homePreviewWrap" onCancel={() => {
        setShowPreview(false)
      }} footer={null} destroyOnClose={true} maskStyle={{
        backdropFilter: "saturate(180%) blur(3px)",
        background: "rgba(0, 0, 0, 0.4)"
      }}>
        { srcUrl && <Preview srcUrl={srcUrl} /> }
      </Modal>
      <Breadcrumb prefix="home" path={path}/>
      <TableList data={fileData} pathChange={pathChange} loading={loading} preview={preview}/>
      <footer className="footer">
        <div>nuoDrive</div>
        <div>©2020 Created by xunuo</div>
      </footer>
    </div>
  );
}

export default Home;
