'use client';

import { Box, Flex, Group, Text } from '@mantine/core';

interface PersonTypeConfig {
  title: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

interface PersonTypeData {
  type: 'disability' | 'student' | 'pensioner' | 'veteran' | (string & {});
}

interface PersonTypeSectionProps {
  data: PersonTypeData;
  config: PersonTypeConfig;
}

export const PersonTypeSection = ({ data, config }: PersonTypeSectionProps) => {
  return (
    <Box
      style={{
        backgroundColor: '#DADFFF',
        marginInline: '-16px',
        padding: '16px 26px 16px 26px',
      }}
    >
      <Group gap="xs" mb="xs">
        <Text size="lg">{config.icon}</Text>
        <Text fw={600} c="#280067" size="20px">
          {config.title}
        </Text>
      </Group>

      {data.type === 'disability' && (
        <Flex direction="column" gap="sm">
          <Flex justify="space-between" gap="xs">
            <Text size="sm" c="#070707">
              Type
            </Text>
            <Text size="sm" fw={500}>
              Type of disability
            </Text>
          </Flex>
          <Flex justify="space-between" gap="xs">
            <Text size="sm" c="#070707">
              Group
            </Text>
            <Text size="sm" fw={500}>
              Group of Disability
            </Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
