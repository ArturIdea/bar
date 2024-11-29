'use client';

import { Card, Flex, Image, Text } from '@mantine/core';
import { useMobileBreakpoint } from '@/ui/hooks/ui/useMobileBreakPoint';

const StoreIconsMobile = () => {
  const isMobile = useMobileBreakpoint(600);

  return (
    <Card withBorder radius="lg">
      <Flex
        bg={isMobile ? 'white' : 'transparent'}
        direction="column"
        rowGap={16}
        justify="center"
        p={40}
      >
        <Text fw={500} size="md">
          DOWNLOAD THE BARAKA APP FOR MORE DETAILS
        </Text>
        <Flex columnGap={8} justify="space-between">
          <Flex h={40} w={139}>
            <Image src="/images/logos/google_mobile.svg" width={139} height={40} fit="cover" />
          </Flex>
          <Flex h={40} w={139}>
            <Image src="/images/logos/apple_mobile.svg" width={139} height={40} fit="cover" />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
export default StoreIconsMobile;
