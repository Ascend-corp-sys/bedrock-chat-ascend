import React, { ReactNode, cloneElement, ReactElement } from 'react';
import { BaseProps } from '../@types/common';
import { Authenticator } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { SocialProvider } from '../@types/auth';

type Props = BaseProps & {
  socialProviders: SocialProvider[];
  children: ReactNode;
};

const AuthAmplify: React.FC<Props> = ({ socialProviders, children }) => {
  const { t } = useTranslation();
  const { signOut } = useAuthenticator();

  return (
    <>
      <style>{`
        /* サインアップタブを非表示 */
        [data-amplify-authenticator] [role="tablist"] [role="tab"]:last-child,
        [data-amplify-authenticator-signup],
        button[data-amplify-authenticator-signup],
        a[href*="signup"],
        a[href*="signUp"] {
          display: none !important;
        }
      `}</style>
      <Authenticator
        initialState="signIn"
        socialProviders={socialProviders}
        components={{
          Header: () => (
            <div className="mb-5 mt-10 flex justify-center text-3xl text-aws-font-color-light">
              {t('app.name')}
            </div>
          ),
        }}>
        <>{cloneElement(children as ReactElement, { signOut })}</>
      </>
    </>
  );
};

export default AuthAmplify;
