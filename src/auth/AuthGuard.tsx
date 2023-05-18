import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getRole } from 'src/redux/slices/role';
import { useDispatch } from 'src/redux/store';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, setRolePage, rolePage } = useAuthContext();
  const dispatch = useDispatch();
  const datarole = useSelector((state: any) => state.role.roleList);
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const render = async () => {
    const res = await dispatch(getRole());
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    if (datarole) {
      setRolePage(datarole);
    }
  }, [datarole]);

  // console.log(':::::::::::::', rolePage);
  // console.log(':::::::::::::datarole', datarole);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
