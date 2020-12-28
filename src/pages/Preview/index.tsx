import React, {useEffect, useState} from 'react';
// @ts-ignore
import Breadcrumb from "/@components/Breadcrumb"
import DPlayer from "react-dplayer"
import { useHistory } from "react-router-dom";

function Index({ location }) {
  const history = useHistory();
  const [url, setUrl] = useState('')
  const path = history.location.pathname.replace(/^\/preview/, "")
  useEffect(() => {
    if (location && location.state.url) {
      const url = 'http://downproxy.xunuo.ga?url=' + encodeURIComponent(location.state.url)
      // const url = location.state.url
      setUrl(url)
    }
  }, [])
  return (
    <div>
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
