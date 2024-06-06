import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Flex, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components/UI';
import { useGetAccountQuery, useLazyLogoutUserQuery, useLazyPostAccountQuery } from '@/store/api';

import styles from './Modals.module.scss';

export const LoginModal = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [postAccount, { error, data, isFetching: isAuthLoading }] = useLazyPostAccountQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: user, isFetching: isGetUserLoading } = useGetAccountQuery();
  const [logout, { isFetching: isLogoutLoading }] = useLazyLogoutUserQuery();
  const navigate = useNavigate();

  const [isUserLogged, setIsUserLogged] = useState(Boolean(user?.email));

  const showMessage = useCallback(
    (alertMessage: string, type: 'error' | 'success') => {
      messageApi.open({
        type: type,
        content: alertMessage,
      });
    },
    [messageApi],
  );

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await postAccount(values);
      setIsUserLogged(true);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserLogged(false);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

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
      {isUserLogged ? (
        <Button loading={isLogoutLoading} onClick={handleLogout}>
          {t('header_logout')}
        </Button>
      ) : (
        <Button loading={isGetUserLoading} onClick={() => setIsModalOpen(true)}>
          {t('header_login')}
        </Button>
      )}
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
            <Button htmlType="submit" className={styles.submit} loading={isAuthLoading}>
              {t('submit')}
            </Button>
          </Form>
        </Flex>
      </Modal>
    </Flex>
  );
});
