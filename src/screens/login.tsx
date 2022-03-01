import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from 'native-base'
import * as React from 'react'
import { useEffect } from 'react'
import { useAuth } from '..'

export const Login = () => {
  const auth = useAuth()
  const [formData, setData] = React.useState({
    email: '',
    password: '',
  })
  const [isValid, setIsValid] = React.useState(true)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  useEffect(() => {
    return () => {
      setIsSubmitted(false)
    }
  }, [])

  const validate = () => {
    if (formData.email === '' || formData.password === '') {
      return false
    }
    return true
  }

  const onSubmit = async () => {
    setIsSubmitted(true)
    if (validate()) {
      const res = await auth.signIn(formData)
      if (!res) {
        setIsValid(false)
        console.log('Invalid form data')
      }
    }
    setIsSubmitted(false)
  }

  return (
    <Center h="100%" w="100%" bg="gray.50">
      {isSubmitted ? <Spinner color="yogiCup.navy" size="lg" /> : null}
      <Box mb="200" safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="md"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome to Yogi Cup
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
          </FormControl>
          {!isValid ? (
            <Text color="red.400">Invalid email or password</Text>
          ) : (
            <></>
          )}
          <Button
            mt="2"
            bg="yogiCup.orange"
            onPress={onSubmit}
            disabled={isSubmitted}
          >
            <Text color="yogiCup.white">Sign In</Text>
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}
