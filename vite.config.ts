// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/",
//   build: {
//     chunkSizeWarningLimit: 3000,
//   },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Adjust this if deploying to a subdirectory
  build: {
    chunkSizeWarningLimit: 3000,
    outDir: "dist", // Ensures the build output goes to the 'dist' folder
  },
  server: {
    port: 3000, // Local development server port (optional)
  },
});
