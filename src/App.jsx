import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeContext';
import { ProvidersProvider } from './context/ProvidersContext';
import { CustomersProvider } from './context/CustomersContext';
import { RewardsProvider } from './context/RewardsContext';
import { ConfigProvider } from './context/ConfigContext';
import { WorkHistoryProvider } from './context/WorkHistoryContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      onError: (error) => {
        console.error('Query Error:', error?.message || 'An error occurred');
      }
    },
    mutations: {
      useErrorBoundary: false,
      onError: (error) => {
        console.error('Mutation Error:', error?.message || 'An error occurred');
      }
    }
  }
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ConfigProvider>
          <RewardsProvider>
            <ProvidersProvider>
              <CustomersProvider>
                <WorkHistoryProvider>
                  <Router>
                    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                      <MainContent sidebarOpen={sidebarOpen} />
                    </div>
                  </Router>
                  <Toaster position="top-right" />
                </WorkHistoryProvider>
              </CustomersProvider>
            </ProvidersProvider>
          </RewardsProvider>
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;