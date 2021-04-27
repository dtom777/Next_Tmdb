import '../styles/globals.css';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import LayoutHeader from '../components/LayoutHeader'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <LayoutHeader />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
