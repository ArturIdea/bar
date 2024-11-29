import {Flex, Image, Text} from "@mantine/core";

const ProfileImage = () => {
  return (
    <Flex direction="column" align="center" rowGap={16}>
      <Flex
        h={160}
        w={160}
        style={{borderRadius: '50%', overflow: 'hidden', border: '1px solid #ECEEF4'}}
      >
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          width={160}
          height={160}
          fit="cover"
        />
      </Flex>
      <Text fw={700} size="xl">Imron Karimov</Text>
    </Flex>
  )
}
export default ProfileImage