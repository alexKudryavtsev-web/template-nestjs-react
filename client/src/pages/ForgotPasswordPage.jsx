import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormControl, Input, VStack } from '@chakra-ui/react';
import CenterOnPage from '../components/ui/CenterOnPage';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
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
            <FormControl>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="email"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              reset password
            </Button>
          </VStack>
        </form>
      </Box>
    </CenterOnPage>
  );
}

export default LoginPage;
