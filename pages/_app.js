import Head from "next/head";
// import { SessionProvider } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import {
  QueryProvider,
  AuthSessionProvider,
  MuiThemeProvider,
  // GravatarsProvider,
  // AuthApiProvider,
  AppEventsProvider,
  WindowDocumentProvider,
} from "../app/providers";
//
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "../app/store/redux";
//
//
import { ToastContainer } from "react-toastify";
import PortalOverlays from "../components/PortalOverlays";
//
import { LoaderBars } from "../components/loaders";
//
// import { ResourceMainProvider } from "../app/resource";
//
//
import "../styles/reset.css";
import "../styles/build.css";
import "../styles/globals.css";
import "@fancyapps/ui/dist/fancybox.css";
import "react-toastify/dist/ReactToastify.min.css";
import "animate.css";
//
const pageVariantsMotion = {
  in: {
    opacity: 1,
    transition: {
      duration: 0.24,
    },
    // position: "initial",
    // zindex: "initial",
  },
  out: {
    opacity: 0.24,
    transition: {
      duration: 0.24,
    },
    position: "absolute",
    width:"100%",
    zIndex: -1,
  },
};

////
////
function App({
  Component,
  // pageProps: { session, ...restPageProps },
  pageProps,
  router: { route },
}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>nikolav | komponente reactjs</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1"
        />
        <meta
          name="description"
          content="Nikola Vuković is a web developer from Mladenovac, Serbia. He has 5+ years of experience with fullstack web development with a focus on user interfaces, ineraction and data modeling. In his spare time, Nikola Vuković does languages, modern technologies, gymnastics, wine&amp;spirits, bookkeeping, accounting, history, arts, positive life habits, astrology&amp;tarot, dating, travel, time management, resource planing, logistics, design, and more. Никола Вуковић је веб програмер из Младеновца у Србији. Има 5+ година искуства са фуллстак веб развојем са фокусом на кориснички интерфејс и моделирање података. У слободно време Никола Вуковић бави се језицима, савременим технологијама, гимнастиком, вином и жестоким пићима, пословном анализом, вођењем књига, креирањем пословних планова, рачуноводством, астрологијом и таротом, историјом, уметношћу, позитивним животним навикама, забављањем, путовањима, управљањем временом, планирањем ресурса, логистиком, дизајном. admin@nikolav.rs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WindowDocumentProvider>
        <AppEventsProvider>
          <ReduxStoreProvider store={store}>
            <QueryProvider>
              {/* <SessionProvider
        session={session}
        refetchInterval={0}
        refetchOnWindowFocus={true}
      > */}
              {/* <ResourceMainProvider> */}
              {/* <AuthApiProvider> */}
              <AuthSessionProvider>
                {/* <GravatarsProvider> */}
                <MuiThemeProvider>
                  {/* mui css reset */}
                  <CssBaseline />
                  {/*  */}
                  {/*  */}
                  {/* toasts */}
                  {/* https://fkhadra.github.io/react-toastify/api/toast-container */}
                  <PortalOverlays>
                    <ToastContainer
                      autoClose={4567}
                      closeOnClick
                      draggable
                      hideProgressBar
                      limit={3}
                      newestOnTop={false}
                      pauseOnFocusLoss
                      pauseOnHover
                      // top-right, top-center, top-left,
                      // bottom-right, bottom-center, bottom-left
                      //   @toast.POSITION
                      position="top-right"
                      rtl={false}
                      //
                      // closeButton
                      // icon={false}
                      // theme=light|dark|colored
                    />
                  </PortalOverlays>
                  <AnimatePresence 
                  // exitBeforeEnter 
                  initial={false}>
                    <motion.div
                      key={route}
                      initial="out"
                      animate="in"
                      exit="out"
                      variants={pageVariantsMotion}
                    >
                      {/*  */}
                      {/* page content */}
                      <Component {...pageProps} />
                    </motion.div>
                  </AnimatePresence>
                  {/*  */}
                  {/* flags app-processing status */}
                  <LoaderBars />
                  {/*  */}
                </MuiThemeProvider>
                {/* </GravatarsProvider> */}
              </AuthSessionProvider>
              {/* </AuthApiProvider> */}
              {/* </ResourceMainProvider> */}
              {/* </SessionProvider> */}
            </QueryProvider>
          </ReduxStoreProvider>
        </AppEventsProvider>
      </WindowDocumentProvider>
    </>
  );
}

export default App;
