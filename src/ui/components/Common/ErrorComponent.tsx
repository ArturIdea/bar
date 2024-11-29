import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <Box pos="fixed" w="100%" top={0} style={{ overflow: 'hidden', height: '100vh' }}>
      <Container h="100vh" display="flex" style={{ alignItems: 'center' }}>
        <Stack align="center" gap="xl" style={{ width: '100%' }}>
          <Title ta="center" order={1} size="h1">
            Oops! Something went wrong
          </Title>

          <Text c="dimmed" size="lg" maw={500} ta="center">
            {error.message}
          </Text>

          <Group>
            <Button variant="light" size="md" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Group>

          <Box
            pos="fixed"
            bottom={0}
            left={0}
            w={200}
            h={200}
            style={{
              background: 'var(--mantine-color-blue-1)',
              borderRadius: '100%',
              transform: 'translate(-50%, 50%)',
              opacity: 0.5,
              zIndex: -1,
            }}
          />

          <Box
            pos="fixed"
            top={0}
            right={0}
            w={300}
            h={300}
            style={{
              background: 'var(--mantine-color-red-1)',
              borderRadius: '100%',
              transform: 'translate(50%, -50%)',
              opacity: 0.5,
              zIndex: -1,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
