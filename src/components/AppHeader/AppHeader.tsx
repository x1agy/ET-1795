import { FC, memo, useCallback, useState } from 'react';
import { Button, Flex, Popover } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useTranslation } from 'react-i18next';
import { ImEarth } from 'react-icons/im';
import { Link } from 'react-router-dom';

import { LoginModal } from '../Modals';

import styles from './AppHeader.module.scss';

export const AppHeader = () => {
  const { t, i18n } = useTranslation();
  const [isLngSelectOpen, setIsLngSelectOpen] = useState(false);

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n],
  );

  const handlePopoverChange = useCallback((state: boolean) => setIsLngSelectOpen(state), []);

  return (
    <Header className={styles.header}>
      <Flex gap="1em" className={styles.linkHolder}>
        <Link to="/dashboard" className={styles.linkHolder_link}>
          {t('main')}
        </Link>
        <Link to="/workWithCSV" className={styles.linkHolder_link}>
          {t('csv_work')}
        </Link>
        <Link to="/string-statistic" className={styles.linkHolder_link}>
          {t('string_stats')}
        </Link>
        <Link to="/zip-string" className={styles.linkHolder_link}>
          {t('zip_string')}
        </Link>
        <Link to="/apply-template" className={styles.linkHolder_link}>
          {t('apply_template')}
        </Link>
      </Flex>
      <Flex gap="1em">
        <Popover
          content={<ChangeLanguagePopover handleChangeLanguage={changeLanguage} />}
          title={t('language')}
          trigger="click"
          open={isLngSelectOpen}
          onOpenChange={handlePopoverChange}
        >
          <Button>
            <ImEarth />
          </Button>
        </Popover>
        <LoginModal />
      </Flex>
    </Header>
  );
};

interface ChangeLanguagePopoverProps {
  handleChangeLanguage: (arg: string) => void;
}

const ChangeLanguagePopover: FC<ChangeLanguagePopoverProps> = memo(({ handleChangeLanguage }) => {
  return (
    <Flex vertical gap="10px">
      <Button onClick={() => handleChangeLanguage('ru')}>Russian</Button>
      <Button onClick={() => handleChangeLanguage('en')}>English</Button>
    </Flex>
  );
});
