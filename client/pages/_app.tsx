import '../app/assets/styles/globals.scss'
import type {AppProps} from 'next/app'
import AuthProvider from "../app/provider/AuthProvider";
import {QueryClient, QueryClientProvider} from 'react-query'
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
