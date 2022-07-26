import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, VStack } from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';
import PasswordInput from '../components/ui/PasswordInput';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit(data) {
      console.log(data);
    },
  });
  return (
    <CenterOnPage>
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <PasswordInput
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button type="submit" colorScheme="teal" width="full">
              set new password
            </Button>
          </VStack>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default LoginPage;
