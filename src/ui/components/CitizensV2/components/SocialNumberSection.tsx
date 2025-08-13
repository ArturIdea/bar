'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import {
  ActionIcon,
  CopyButton,
  Flex,
  Group,
  rem,
  Text,
} from '@mantine/core';

interface SocialNumberSectionProps {
  socialNumber: string;
}

export const SocialNumberSection = ({ socialNumber }: SocialNumberSectionProps) => {
  return (
    <Flex justify="space-between" direction="column" gap="8px">
      <Text size="lg" c="black">
        Ijtimoiy raqam/Social number
      </Text>
      <Group gap="xs">
        <Text fw={600} size="30px">
          986025436530783
        </Text>
        <CopyButton value={socialNumber} timeout={2000}>
          {({ copied, copy }) => (
            <ActionIcon
              color={copied ? 'teal' : 'gray'}
              variant="subtle"
              onClick={copy}
              size="sm"
            >
              {copied ? (
                <IconCheck style={{ width: rem(24) }} />
              ) : (
                <IconCopy style={{ width: rem(24), color: '#000000' }} />
              )}
            </ActionIcon>
          )}
        </CopyButton>
      </Group>
    </Flex>
  );
};