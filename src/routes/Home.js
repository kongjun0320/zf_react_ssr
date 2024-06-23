import React from 'react';
import withStyles from 'isomorphic-style-loader-react18/withStyles';

import styles from './Home.css';

function Home() {
  return <div className={styles.theme}>home</div>;
}

export default withStyles(styles)(Home);
