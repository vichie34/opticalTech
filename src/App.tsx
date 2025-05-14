import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage/Home';
import SignUpWallet from './components/Auth/SignupWallet';
import WalletConnected from './components/Auth/WalletConnected';
import OptiCheckWelcome from './components/Onboarding4/optiCheckWelcome';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import EmailConfirmation from './components/Auth/EmailConfirmation';
import UserOnboarding from './components/Onboarding2/OnboardUser';
import { Dashboard } from './components/UI/Dashboard/Dashboard';
import { HowItWorks } from './components/UI/Screen/HowitWorks/HowItWorks';
import { Test } from './components/UI/Screen/Test/Test';
import { TestResult } from './components/UI/Screen/TestResults/TestResult';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<OptiCheckWelcome />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/WalletConnected" element={<WalletConnected />} />
          <Route path="/sign_in_with_wallet" element={<SignUpWallet />} />
          <Route path="/Email" element={<EmailConfirmation />} />
          <Route path="/Onboarding" element={<UserOnboarding />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/TestResult" element={<TestResult />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;