import React from 'react';
import withStyles from 'isomorphic-style-loader-react18/withStyles';
import { Helmet } from 'react-helmet';

import styles from './Home.css';

function Home() {
  return (
    <>
      <Helmet>
        <title>我是首页的标题</title>
        <meta name="description" content="home description" />
      </Helmet>
      <div className={styles.theme}>home</div>
    </>
  );
}

export default withStyles(styles)(Home);
