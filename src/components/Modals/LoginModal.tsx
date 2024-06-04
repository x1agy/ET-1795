import { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/UI';
import { useLazyPostAccountQuery } from '@/store/api';

import styles from './Modals.module.scss';

export const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [postAccount, { error, data }] = useLazyPostAccountQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (values: { email: string; password: string }) => {
    await postAccount(values);
  };

  const showMessage = useCallback(
    (alertMessage: string, type: 'error' | 'success') => {
      messageApi.open({
        type: type,
        content: alertMessage,
      });
    },
    [messageApi],
  );

  useEffect(() => {
    if (error) {
      showMessage(t('wrongLogin'), 'error');
    } else if (data?.status) {
      showMessage(t('successLogin'), 'success');
      setIsModalOpen(false);
    }
  }, [data?.status, error, showMessage, t]);

  return (
    <Flex vertical>
      {contextHolder}
      <Button onClick={() => setIsModalOpen(true)}>{t('header_login')}</Button>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        headerProps={{ title: t('header_login'), titleCentered: true }}
      >
        <Flex className={styles.formHolder}>
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            validateTrigger="onBlur"
            className={styles.form}
          >
            <Form.Item
              label={t('header_login')}
              name="email"
              rules={[
                { required: true, message: t('fillField') },
                { pattern: /\w+@\w+\.\w+/, message: t('validEmail') },
              ]}
              initialValue="testuser@test.test"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('header_password')}
              name="password"
              rules={[{ required: true, message: t('fillField') }]}
              initialValue="test-password"
            >
              <Input.Password />
            </Form.Item>
            <Button htmlType="submit" className={styles.submit}>
              {t('submit')}
            </Button>
          </Form>
        </Flex>
      </Modal>
    </Flex>
  );
};
