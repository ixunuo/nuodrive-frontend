import React, {useEffect, useState} from 'react'
import { Spin, Image } from 'antd'
import DPlayer from "react-dplayer"
import PdfViewer from './PDF'
import CodeViewer from './Code'
import './index.less'

let useCdn
useCdn = 'http://downproxy.008877.xyz?url='

function Index({ record }) {
  const [loading, setLoading] = useState(true)
  let previewDom
  let { type, url } = record
  if (useCdn) url = useCdn + encodeURIComponent(record.url)
  switch (type) {
    case "video":
      previewDom = (
        <div className="preview">
          {record.url && <DPlayer
            options={{
              video: {
                url,
                preload: "auto"
              }
            }}
          />}
        </div>
      );
      break
    case "img":
      previewDom = (
        <div className="preview">
          <Image
            src={url}
            onLoad={() => {
              setLoading(false)
            }}
          />
        </div>
      )
      break
    case "pdf":
      previewDom = (
        <div className="preview">
          <PdfViewer url={url}/>
        </div>
      )
      break
    case "doc": case "ppt": case "xls":
      previewDom = (
        <div className="preview">
          <iframe width="100%" style={{height: "calc(100vh - 120px)"}} frameBorder="no" src={"http://view.officeapps.live.com/op/view.aspx?src=" + encodeURIComponent(url)} />
        </div>
        )
      break
    case "txt":
      previewDom = (
        <div className="preview">
          <CodeViewer url={url} />
        </div>
        // <div style={{padding: 20, maxHeight: "calc(100vh - 120px)", overflow: "auto"}}>{data}</div>
      )
      break
    case "code":
      previewDom = (
        <div className="preview">
          <CodeViewer url={url} />
        </div>
      )
  }
  return previewDom
}

export default Index;
