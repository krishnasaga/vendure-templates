import React, { type ReactElement } from 'react';

const Layout = ({children} : {children: ReactElement}) => {
  return <div>
   {children}
   </div>
};

export default Layout;
