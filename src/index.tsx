import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme"; //theme 컴포넌트를 임포트. 이제 App에서 theme에 접근할 수 있다
import { QueryClient, QueryClientProvider } from "react-query"; //query client를 사용하기 위해 QueryClientProvider import.
//App을 QueryClientProvider로 감싸주자

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
