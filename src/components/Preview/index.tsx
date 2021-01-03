import React, {useState} from 'react'
import { Spin, Image } from 'antd'
import DPlayer from "react-dplayer"
import PdfViewer from './PdfViewer'

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
  }
  return previewDom

}

export default Index;
