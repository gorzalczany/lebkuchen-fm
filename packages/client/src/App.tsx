import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './login/components/LoginForm';
import { AdminPanel } from './admin/components/AdminPanel';
import { FmPlayer } from './fm-player/components/FmPlayer';
import { SoundBoard } from './sound-board/components/SoundBoard';
import { SplashScreen } from './splash-screen/components/SplashScreen';
import { XSoundUploadForm } from './xsound-upload-form/components/XSoundUploadForm';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/add-sound" element={<XSoundUploadForm />} />
        <Route path="/player" element={<FmPlayer />} />
        <Route path="/soundboard" element={<SoundBoard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
