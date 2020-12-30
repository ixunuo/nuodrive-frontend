import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import './index.less'

const { Fragment } = React

function Breadcrumb({prefix, path}) {
  const $container: any = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    $container.current = document.querySelector('#breadcrumb')
    setReady(true);
  }, []);

  const Separation = () => {
    return <span style={{color: "#bfbfbf"}}> / </span>
  }

  const element = (
    <>
      <Link to={"/" + prefix}>首页</Link>
      {path ? path.split('/').filter(item => item).map((item, index) => {
        if (index < path.split('/').filter(item => item).length - 1) {
          return <Fragment key={index}><Separation /><Link to={`/${prefix}/` + path.split('/').filter(item => item).slice(0, index + 1).join('/')}>{
            item.length < 9 ? item : item.slice(0, 6) + '…'
          }</Link></Fragment>
        } else {
          return <span key={index} className="current"><Separation />{
            item.length < 9 ? item : item.slice(0, 6) + '…'
          }</span>
        }
      }) : null}
    </>
  )

  if (ready) {
    return ReactDOM.createPortal(element, $container.current);
  } else {
    return null;
  }
}

export default Breadcrumb;
