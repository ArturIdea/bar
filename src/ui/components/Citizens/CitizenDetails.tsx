'use client';

import {BackgroundImage, Container, Flex} from '@mantine/core';
import { Citizen } from '@/domain/citizen/entities/Citizen';
import BadgeSection from '@/ui/components/ValidationPage/Badge';
import BasicInfoSection from '@/ui/components/ValidationPage/BasicInfoSection';
import BottomSection from '@/ui/components/ValidationPage/BottomSection';
import IconSection from '@/ui/components/ValidationPage/IconSection';
import ProfileImage from '@/ui/components/ValidationPage/ProfileImage';
import StoreIconsMobile from '@/ui/components/ValidationPage/StoreIconsMobile';
import { useMobileBreakpoint } from '@/ui/hooks/ui/useMobileBreakPoint';

interface CitizenDetailsProps {
  citizen: Citizen;
}

export default function CitizenDetails({ citizen }: CitizenDetailsProps): JSX.Element {
  const isMobile = useMobileBreakpoint(600);

  return (
    <Flex maw={800} h="calc(100vh - 57px)" direction="column" align="center" m="0 auto">
      <BackgroundImage src="/images/background/background_profile.png" radius="sm">
        <Container size="md">
          <Flex maw="100%" direction="column" align="center">
            <ProfileImage citizen={citizen}/>
            <Flex mb={16} />
            <BadgeSection />
            <Flex mb={32} />
            <BasicInfoSection citizen={citizen}/>
            <Flex mb={32} />
            <Flex w="100%" maw={800} direction={isMobile ? 'column-reverse' : 'column'}>
              <IconSection />
              <Flex mb={isMobile ? 16 : 104} />
              <BottomSection />
            </Flex>
            {isMobile && <Flex mb={16} />}
            {isMobile && <StoreIconsMobile />}
            <Flex mb={32} />
          </Flex>
        </Container>
      </BackgroundImage>
    </Flex>
  );
}
