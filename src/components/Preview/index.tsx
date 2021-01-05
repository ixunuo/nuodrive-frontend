import React, {useEffect, useState} from 'react'
import { Spin, Image } from 'antd'
import DPlayer from "react-dplayer"
import PdfViewer from './PDF'
import CodeViewer from './Code'

let useCdn
useCdn = 'http://downproxy.xunuo.ga?url='

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
        <PdfViewer url={url}/>
      )
      break
    case "doc": case "ppt": case "xls":
      previewDom = (
        <iframe width="100%" style={{height: "calc(100vh - 120px)"}} frameBorder="no" src={"http://view.officeapps.live.com/op/view.aspx?src=" + encodeURIComponent(url)} />
      )
      break
    case "txt":
      previewDom = (
        <CodeViewer url={url} />
        // <div style={{padding: 20, maxHeight: "calc(100vh - 120px)", overflow: "auto"}}>{data}</div>
      )
      break
    case "code":
      previewDom = (
        <CodeViewer url={url} />
      )
  }
  return previewDom
}

export default Index;
