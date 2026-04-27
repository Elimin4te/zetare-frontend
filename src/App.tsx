import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

// project import
import AnalyticsInit from 'components/AnalyticsInit';
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

import { oidcProviderPropsForAuthProvider } from 'config/oidcConfig';
import { isOidcClientConfigured } from 'config/appConfig';
import { JWTProvider } from 'contexts/JWTContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const jwtTree = (
  <JWTProvider>
    <>
      <AnalyticsInit />
      <Notistack>
        <RouterProvider router={router} />
        <Snackbar />
      </Notistack>
    </>
  </JWTProvider>
);

export default function App() {
  return (
    <ThemeCustomization>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            {isOidcClientConfigured() ? <AuthProvider {...oidcProviderPropsForAuthProvider()}>{jwtTree}</AuthProvider> : jwtTree}
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
}
