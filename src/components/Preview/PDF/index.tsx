import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Skeleton } from 'antd'
import './index.less'

function MyApp({ url }) {
  const [showRange, setShowRange] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [numPages, setNumPages] = useState(1)
  const [timer, setTimer] = useState(0)
  pdfjs.GlobalWorkerOptions.workerSrc = '/@lib/pdfWorker'
  return (
    <div className="pdfPreview" onScroll={(v) => {
      if (Number(new Date()) - timer < 150) return
      setTimer(Number(new Date()))
      // @ts-ignore
      const toBottom = v.target.scrollHeight - v.target.scrollTop - v.target.clientHeight
      // @ts-ignore
      if (toBottom <= v.target.clientHeight * 2) {
        if (showRange[9] === numPages - 1) return
        if (showRange[9] + 5 < numPages - 1) {
          setShowRange(showRange => [...showRange.map(item => item + 5)])
        } else {
          setShowRange([ numPages - 10, numPages - 9, numPages - 8, numPages - 7, numPages - 6, numPages - 5, numPages - 4, numPages - 3, numPages - 2, numPages - 1])
        }
      } else { // @ts-ignore
        if (v.target.scrollTop < v.target.clientHeight * 2) {
          if (showRange[0] < 5) return
          setShowRange(showRange => [...showRange.map(item => item - 5)])
        }
      }
    }}>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div style={{padding: "20px 40px"}}>
            <Skeleton active paragraph={{ rows: 20 }}/>
          </div>
        }
      >
        {showRange.map((item) => (
          <Page
            // onLoadSuccess={}
            key={`page_${item + 1}`}
            pageNumber={item + 1}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}

export default MyApp
