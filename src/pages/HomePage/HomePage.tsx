import { useState } from 'react';
import { Flex, Image } from 'antd';
import { clsx } from 'clsx';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [isImageShown, setIsImageShown] = useState(false);

  return (
    <Flex className={styles.imageHolder} align="center" justify="center">
      <Image
        src="./src/assets/lilNigaJRYelling.jpg"
        className={clsx(styles.image, { [styles.image_shown]: isImageShown })}
        onPreviewClose={() => setIsImageShown(true)}
      />
    </Flex>
  );
};
