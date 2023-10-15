import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/pagination";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
    return (
        <>
            <NextNProgress color="#000" options={{ showSpinner: false }} />
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Component {...pageProps} />
                    <Toaster position="top-right" />
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
