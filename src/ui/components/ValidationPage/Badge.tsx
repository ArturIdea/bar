import { useTranslations } from 'next-intl';
import { Flex, Image, Text } from '@mantine/core';

const BadgeSection = () => {
  const t = useTranslations('ProfilePage');
  return (
    <Flex
      direction="row"
      bg="#169A3C"
      style={{ borderRadius: 20 }}
      align="center"
      justify="space-evenly"
      py={4}
      px={8}
      columnGap={4}
    >
      <Image src="/images/icons/shield-tick.svg" width={16} height={16} fit="cover" />
      <Text size="sm" c="white" fw={500}>
        {t('verified')}
      </Text>
    </Flex>
  );
};
export default BadgeSection;
