import React from 'react';
import DPlayer from "react-dplayer"

function Index({ srcUrl }) {
  return (
    <div className="preview">
      {srcUrl && <DPlayer
        options={{
          video: {
            url: srcUrl,
            preload: "auto"
          }
        }}
      />}
    </div>
  );
}

export default Index;
