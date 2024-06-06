import { useMemo, useState } from 'react';
import { Button, Flex, Input } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './StringStats.module.scss';

const StringStats = () => {
  const { t } = useTranslation();
  const buttons = useMemo(() => [t('validateSquare'), t('validateRound'), t('validateCurly')], [t]);
  const [selectedButtons, setSelectedButtons] = useState<{ [key: string]: boolean }>(
    buttons.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
  );

  type SelectedButtonsKey = keyof typeof selectedButtons;

  return (
    <Flex vertical justify="center" align="center" gap="18px">
      <ButtonGroup>
        {buttons.map((item, index) => {
          const button: SelectedButtonsKey = item as SelectedButtonsKey;
          return (
            <Button
              className={clsx({ [styles.selected]: selectedButtons[button] })}
              onClick={() =>
                setSelectedButtons({ ...selectedButtons, [item]: !selectedButtons[item] })
              }
              key={index}
            >
              {button}
            </Button>
          );
        })}
      </ButtonGroup>
      <Input />
    </Flex>
  );
};

export default StringStats;
