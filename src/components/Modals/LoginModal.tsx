import { useState } from 'react';
import { Button, Flex, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/UI';

export const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <Flex vertical>
      <Button onClick={() => setIsModalOpen(true)}>{t('header_login')}</Button>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        headerProps={{ title: t('header_login'), titleCentered: true }}
      >
        <Tabs defaultActiveKey="1" />
      </Modal>
    </Flex>
  );
};
