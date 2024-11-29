import { FC } from 'react';
import { Flex, Image, Text } from '@mantine/core';
import { Citizen } from '@/domain/citizen/entities/Citizen';

interface ProfileImageProps {
  citizen: Citizen;
}

const ProfileImage = ({ citizen }: ProfileImageProps) => {
  return (
    <Flex mt={64} direction="column" align="center" rowGap={16}>
      <Flex
        h={160}
        w={160}
        style={{ borderRadius: '50%', overflow: 'hidden', border: '1px solid #ECEEF4' }}
      >
        <Image
          src={citizen.image}
          width={160}
          height={160}
          fit="cover"
        />
      </Flex>
      <Text fw={700} size="xl">
        {citizen.firstName}
      </Text>
    </Flex>
  );
};
export default ProfileImage;
