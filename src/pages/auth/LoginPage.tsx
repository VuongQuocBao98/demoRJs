import { Helmet } from 'react-helmet-async';

// sections
import Login from '../../sections/auth/Login';
import { useEffect, useState } from 'react';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>CamBridge Test</title>
      </Helmet>

      <Login />
    </>
  );
}
