import React from 'react';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

function Responsive({ breakPoint, children }) {
  const screens = useBreakpoint();
  if (screens[breakPoint] === true) {
    return (
      children
    )
  } else {
    return null
  }
}

export default Responsive;