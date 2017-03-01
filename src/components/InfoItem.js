import React, {PropTypes} from 'react';
import styles from './InfoItem.css';

function InfoItem({title, content}) {
  return (
    <div className={styles.normal}>
      <span className={styles.title}>
        {title}
      </span>
      <span className={styles.content}>
        {content}
      </span>
    </div>
  )
}

InfoItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default InfoItem;
