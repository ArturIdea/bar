import {
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export default function Page() {
  return (
    <Flex align="center" justify="center" h="85vh">
      <Container size={300}>
        <Stack gap={0} align="center" ta="center">
          <img
            src="/images/logos/brand-logo.png"
            alt="Baraka"
            width={100}
            style={{ marginBottom: 20 }}
          />
          <Title order={4} mb={15}>
            Delete your account
          </Title>
          <Text c="dimmed" size="sm" mb={30}>
            We are sad to see you go, but hope to see you again!
          </Text>
        </Stack>
        <form method="post" action="">
          <TextInput placeholder="Email" name="email" required mb={15} />
          <PasswordInput placeholder="Password" name="password" required mb={20} />
          <Group align="center" mb={20}>
            <Checkbox
              label="Please check to confirm account deletion"
              size="sm"
              color="#CD0C91"
              required
            />
          </Group>
          <Button type="submit" color="#CD0C91" fullWidth>
            Delete
          </Button>
        </form>
      </Container>
    </Flex>
  );
}
