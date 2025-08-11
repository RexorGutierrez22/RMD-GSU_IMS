import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Import React plugin for Vite
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        react(),  // Add React plugin for Vite
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],  // Laravel specific entry points
            refresh: true,
        }),
    ],
    server: {
        host: '0.0.0.0',  // Ensure Vite listens on all network interfaces in Docker
        port: 5173,  // Default port for Vite
    },
});
