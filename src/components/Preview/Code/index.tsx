import React, {useState, useEffect} from 'react';
import axios from 'axios'

function Index({url}) {
  const [data, setData] = useState('')
  useEffect(() => {
    axios.get(url).then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <pre style={{padding: 20, maxHeight: "calc(100vh - 120px)", overflow: "auto"}}>
      {data}
    </pre>
  );
}

export default Index;
