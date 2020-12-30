import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

function Breadcrumb({prefix, path}) {
  const $container: any = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    $container.current = document.querySelector('#breadcrumb')
    setReady(true);
  }, []);

  if (ready) {
    return 123
  } else {
    return null;
  }
}

export default Breadcrumb;
