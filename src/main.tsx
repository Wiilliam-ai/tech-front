import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import '@cyntler/react-doc-viewer/dist/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Fragment>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Fragment>,
)
