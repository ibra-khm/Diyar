import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import axios from 'axios'
// import NProgress from 'nprogress';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';

import Layout from '../components/Layout'

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.baseURL = "http://127.0.0.1:8000/",
  axios.defaults.withCredentials = true;


export default function App({Component, pageProps }: AppProps <{session: Session;}> ) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>

        </Head>

        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>

    </>
  )
}
