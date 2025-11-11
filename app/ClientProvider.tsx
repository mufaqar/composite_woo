"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryProvider } from "./providers/QueryProvider";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <QueryProvider>{children}</QueryProvider>
        </Provider>
    );
}
