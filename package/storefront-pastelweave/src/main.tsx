import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import IframeBootstrap from "../utils/Injecter";

const client = new ApolloClient({
  uri: "https://indiastore2.duckdns.org/shop-api",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <IframeBootstrap />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </>
  </StrictMode>,
);
