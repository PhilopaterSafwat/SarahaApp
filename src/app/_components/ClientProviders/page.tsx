'use client';

import { store } from '@/app/redux/store';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';


export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster />
        </Provider>
    );
}