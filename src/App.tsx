import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage/Home';
import SignUpWallet from './components/Auth/SignupWallet';
import WalletConnected from './components/Auth/WalletConnected';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import EmailConfirmation from './components/Auth/EmailConfirmation';
import UserOnboarding from './components/Onboarding2/OnboardUser';
import { Dashboard } from './components/UI/Dashboard/Dashboard';
import { HowItWorks } from './components/UI/Screen/HowitWorks/HowItWorks';
import { Test } from './components/UI/Screen/Test/Test';
import { TestResult } from './components/UI/Screen/TestResults/TestResult';
import { Toaster } from 'sonner';
import Profile from './components/Navigation/profile';
import UpdateProfile from './components/Navigation/updateprofile';
import Notifications from './components/Navigation/notification';
import LanguageSelection from './components/Navigation/lang-selection';
import ChangePassword from './components/Navigation/changepassword';
import History from './components/Navigation/history';
import { SnellenTest } from './components/UI/Screen/Test/SnellenTest';
import { ColorBlindnessTest } from './components/UI/Screen/Test/ColorBlindnessTest';

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/LanguageSelection" element={<LanguageSelection />} />
          <Route path="/Changepassword" element={<ChangePassword />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/History" element={<History />} />
          <Route path="/Test/Snellen" element={<SnellenTest onComplete={function (): void {
            throw new Error('Function not implemented.');
          }} />} />
          <Route path="/Test/Colorblindness" element={< ColorBlindnessTest onComplete={function (result: { score: number; distance: number; }): void {
            throw new Error('Function not implemented.');
          }} />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;