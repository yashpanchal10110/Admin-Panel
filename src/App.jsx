import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeContext';
import { ProvidersProvider } from './context/ProvidersContext';
import { ServicesProvider } from './context/ServicesContext';
import { CustomersProvider } from './context/CustomersContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <ProvidersProvider>
        <ServicesProvider>
          <CustomersProvider>
            <Router>
              <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <MainContent sidebarOpen={sidebarOpen} />
              </div>
            </Router>
          </CustomersProvider>
        </ServicesProvider>
      </ProvidersProvider>
    </ThemeProvider>
  );
}

export default App;