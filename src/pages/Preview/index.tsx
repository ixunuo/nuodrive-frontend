import React, {useEffect, useState} from 'react';
// @ts-ignore
import Breadcrumb from "/@components/Breadcrumb"
import DPlayer from "react-dplayer"
import { useHistory } from "react-router-dom";
import './preview.less'

function Index({ location }) {
  const history = useHistory();
  const [url, setUrl] = useState('')
  const [ready, setReady] = useState(false);
  const [player, setPlayer] = useState(false);
  const path = history.location.pathname.replace(/^\/preview/, "")
  useEffect(() => {
    setReady(true)
    if (location && location.state.url) {
      const url = 'http://downproxy.xunuo.ga?url=' + encodeURIComponent(location.state.url)
      // const url = location.state.url
      setUrl(url)
    }
  }, [])
  return (
    <div className="preview">
      <Breadcrumb prefix="home" path={path}/>
      {url && <DPlayer
        options={{
          video: {
            url,
            preload: "auto"
          }
        }}
      />}
    </div>
  );
}

export default Index;
