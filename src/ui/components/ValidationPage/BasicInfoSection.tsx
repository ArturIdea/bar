'use client';

import { useTranslations } from 'next-intl';
import { Card, Flex, Stack, Text } from '@mantine/core';
import { Citizen } from '@/domain/citizen/entities/Citizen';
import { useMobileBreakpoint } from '@/ui/hooks/ui/useMobileBreakPoint';

interface ProfileImageProps {
  citizen: Citizen;
}

const BasicInfoSection = ({ citizen }: ProfileImageProps) => {
  const isMobile = useMobileBreakpoint(600);
  const t = useTranslations('ProfilePage');
  return (
    <Card w="100%" withBorder radius="lg">
      <Flex
        w="100%"
        p={32}
        justify="center"
        gap={isMobile ? 16 : 50}
        direction={isMobile ? 'column' : 'row'}
      >
        {/* First Column */}
        <Stack>
          {[
            { label: t('gender'), value: citizen.gender ?? '-' },
            { label: t('social_number'), value: citizen.socialNumber ?? '-' },
            { label: t('date_of_issue'), value: citizen.dateOfIssue ?? '-' },
            {
              label: t('fingerprint'),
              value: citizen.fingerprint ?? '-',
              isHighlight: !!citizen.fingerprint,
            },
          ].map(({ label, value, isHighlight }, index) => (
            <Flex key={index} gap={8} direction="column">
              <Text size="sm" c="dimmed">
                {label}
              </Text>
              <Text
                fw={500}
                bg={isHighlight ? 'yellow' : 'transparent'}
                style={{
                  borderRadius: isHighlight ? 10 : undefined,
                  padding: isHighlight ? '4px 8px' : undefined,
                  color: isHighlight ? 'white' : undefined,
                }}
              >
                {value}
              </Text>
            </Flex>
          ))}
        </Stack>

        {/* Second Column */}
        <Stack>
          {[
            { label: t('nationality'), value: citizen.nationality ?? '-' },
            { label: 'PINFL', value: citizen.pinfl ?? '-' },
            { label: t('place_of_birth'), value: citizen.placeOfBirth ?? '-' },
          ].map(({ label, value }, index) => (
            <Flex key={index} gap={8} direction="column">
              <Text size="sm" c="dimmed">
                {label}
              </Text>
              <Text fw={500}>{value}</Text>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Card>
  );
};
export default BasicInfoSection;
