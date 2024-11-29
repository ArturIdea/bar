'use client';

import { Flex } from '@mantine/core';
import BadgeSection from '@/src/ui/components/ValidationPage/Badge';
import BasicInfoSection from '@/src/ui/components/ValidationPage/BasicInfoSection';
import BottomSection from '@/src/ui/components/ValidationPage/BottomSection';
import IconSection from '@/src/ui/components/ValidationPage/IconSection';
import ProfileImage from '@/src/ui/components/ValidationPage/ProfileImage';
import StoreIconsMobile from '@/src/ui/components/ValidationPage/StoreIconsMobile';
import { useMobileBreakpoint } from '@/src/ui/hooks/ui/useMobileBreakPoint';

export default function CitizenDetails() {
  const isMobile = useMobileBreakpoint(600);

  return (
    <Flex maw={800} direction="column" align="center" m="0 auto">
      <ProfileImage />
      <Flex mb={16} />
      <BadgeSection />
      <Flex mb={32} />
      <BasicInfoSection />
      <Flex mb={32} />
      <Flex w="100%" maw={800} direction={isMobile ? 'column-reverse' : 'column'}>
        <IconSection />
        <Flex mb={isMobile ? 16 : 64} />
        <BottomSection />
      </Flex>
      {isMobile && <Flex mb={16} />}
      {isMobile && <StoreIconsMobile />}
    </Flex>
  );
}
