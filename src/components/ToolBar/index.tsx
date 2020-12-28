import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";

function ToolBar({ children }) {
  const $container: any = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    $container.current = document.querySelector('#toolBar')
    setReady(true);
  }, []);

  if (ready) {
    return ReactDOM.createPortal(children, $container.current);
  } else {
    return null;
  }
}

export default ToolBar;
