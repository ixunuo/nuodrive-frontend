import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
// @ts-ignore
// import pdfWork from
import { pdfjs } from 'react-pdf';


function MyApp(url) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  pdfjs.GlobalWorkerOptions.workerSrc = '/@lib/pdfWorker'
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width={"300"} pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

export default MyApp
