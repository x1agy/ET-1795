import { Flex } from 'antd';
import { useLoaderData } from 'react-router-dom';

const StringStats = () => {
  const user = useLoaderData();
  console.log(user);
  return <Flex>a</Flex>;
};

export default StringStats;
