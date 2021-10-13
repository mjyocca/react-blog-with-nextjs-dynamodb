import '../styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';
import { GeistProvider, CssBaseline, Page, useTheme } from '@geist-ui/react';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { SWRConfig } from 'swr';
import fetcher from '@/lib/fetch';

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const [themeType, setThemeType] = useState('light');
  const switchThemes = () => {
    setThemeType((last) => (last === 'dark' ? 'light' : 'dark'));
  };
  return (
    <>
      <Head>
        <title>React Blog with NextJS & DynamoDB</title>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <Navigation switchThemes={switchThemes} />
          <Page>
            <Page.Content>
              <div className="content_wrapper">
                <Component {...pageProps} />
              </div>
            </Page.Content>
          </Page>
          <Footer />
        </GeistProvider>
      </SWRConfig>
      <style jsx>{`
        .content_wrapper {
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
