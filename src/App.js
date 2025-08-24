import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { WalletProvider } from "./components/dashboard/walletContext";
import ChatButtons from "./components/ChatButtons";
import Transactions from "./components/dashboard/Transactions";
import { LoaderProvider, useLoader } from "./components/dashboard/LoaderContext";
import GlobalLoader from "./components/dashboard/GlobalLoader";
import { TransactionProvider } from "./components/dashboard/TransactionContext";
import { NotificationProvider } from "./components/dashboard/NotificationProvider";


import Home from "./components/public/Home";
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

import Dashboard from "./components/dashboard/Dashboard";
import Plans from "./components/dashboard/Plans";
import Investments from "./components/dashboard/Investments";
import Deposit from "./components/dashboard/Deposit";
import Withdraw from "./components/dashboard/Withdraw";
import Profile from "./components/dashboard/Profile";
import Referral from "./components/dashboard/Referral";
import Settings from "./components/dashboard/Settings";


// This wrapper ensures GlobalLoader is always on top of all pages
function AppContent() {
  const { loading } = useLoader();

  return (
    <>
      <GlobalLoader show={loading} />
      <WalletProvider>
        <NotificationProvider>
        <TransactionProvider>
        <ChatButtons />
        <Routes>
          {/* Public Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard Pages */}
          <Route element={<DashboardLayout />}>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/plans" element={<Plans />} />
            <Route path="/admin/investments" element={<Investments />} />
            <Route path="/admin/deposit" element={<Deposit />} />
            <Route path="/admin/withdraw" element={<Withdraw />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/referral" element={<Referral />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
        </TransactionProvider>
         </NotificationProvider>
      </WalletProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <LoaderProvider>
        <AppContent />
      </LoaderProvider>
    </Router>
  );
}

export default App;
