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
import { getData } from './api.ts'
import { useHistory } from "react-router-dom";

function Home(props) {
  const history = useHistory();
  const [fileData, setFileData] = useState([])
  const [loading, setLoading] = useState(false)
  const path = history.location.pathname.replace(/^\/home/, "")
  const pathChange = (record) => {
    history.push(history.location.pathname + '/' + record.name);
  }
  const preview = (record) => {
    // let url = 'http://downproxy.xunuo.ga?url=' + encodeURIComponent(record.url)
    // url = 'iina://open?url=' + encodeURIComponent(url)
    // window.open(url)
    // console.log(record)
    history.push({
      pathname: '/preview' + path + '/' + record.name,
      state: record
    })
  }

  useEffect(() => {
    setLoading(true)
    getData(path).then(res => {
      setFileData(res)
      setLoading(false)
    })
  }, [path])

  return (
    <div>
      <Breadcrumb prefix="home" path={path}/>
      <TableList data={fileData} pathChange={pathChange} loading={loading} preview={preview}/>
    </div>
  );
}

export default Home;
