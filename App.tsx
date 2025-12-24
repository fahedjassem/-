
import React, { useState, useEffect } from 'react';
import { AppPages, User, Product, Sale } from './types.ts';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Inventory from './pages/Inventory.tsx';
import Employees from './pages/Employees.tsx';
import Sales from './pages/Sales.tsx';
import Reports from './pages/Reports.tsx';
import Backup from './pages/Backup.tsx';
import Sidebar from './components/Sidebar.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPages>(AppPages.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('km_products');
    return saved ? JSON.parse(saved) : [];
  });

  const [employees, setEmployees] = useState<User[]>(() => {
    const saved = localStorage.getItem('km_employees');
    return saved ? JSON.parse(saved) : [
      { id: 'admin-1', name: 'مدير النظام', email: 'admin@key.com', password: '123', role: 'admin', specialty: 'all' }
    ];
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('km_sales');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('km_products', JSON.stringify(products));
    localStorage.setItem('km_employees', JSON.stringify(employees));
    localStorage.setItem('km_sales', JSON.stringify(sales));
  }, [products, employees, sales]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage(AppPages.DASHBOARD);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage(AppPages.LOGIN);
  };

  const renderPage = () => {
    if (currentPage === AppPages.LOGIN) return <Login onLogin={handleLogin} onNavigate={setCurrentPage} employees={employees} />;
    if (currentPage === AppPages.REGISTER) return <Register onNavigate={setCurrentPage} onRegister={(u) => setEmployees([...employees, u])} />;
    if (currentPage === AppPages.FORGOT_PASSWORD) return <ForgotPassword onNavigate={setCurrentPage} />;
    
    if (!currentUser) return <Login onLogin={handleLogin} onNavigate={setCurrentPage} employees={employees} />;

    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          onLogout={logout} 
          userRole={currentUser.role}
          userName={currentUser.name}
        />
        <main className="flex-1 p-8 overflow-y-auto h-screen custom-scrollbar no-print">
          {currentPage === AppPages.DASHBOARD && <Dashboard products={products} sales={sales} employees={employees} />}
          {currentPage === AppPages.INVENTORY && <Inventory products={products} setProducts={setProducts} />}
          {currentPage === AppPages.EMPLOYEES && <Employees employees={employees} setEmployees={setEmployees} />}
          {currentPage === AppPages.SALES && <Sales products={products} setProducts={setProducts} sales={sales} setSales={setSales} currentUser={currentUser} />}
          {currentPage === AppPages.REPORTS && <Reports sales={sales} />}
          {currentPage === AppPages.BACKUP && <Backup />}
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans antialiased text-slate-900" dir="rtl">
      {renderPage()}
    </div>
  );
};

export default App;
