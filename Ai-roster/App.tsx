import React, { useState, useCallback, useEffect } from 'react';
import { RoastIntensity } from './types';
import { generateRoast } from './services/geminiService';
import { INTENSITY_OPTIONS, CopyIcon, PlayAgainIcon, GitHubIcon } from './constants';
import TypingEffect from './components/TypingEffect';

// Helper component defined outside the main component to prevent re-rendering issues
const IntensitySelector: React.FC<{
  selected: RoastIntensity;
  onChange: (intensity: RoastIntensity) => void;
}> = ({ selected, onChange }) => (
  <div className="flex justify-center items-center space-x-2 sm:space-x-4 bg-gray-200 p-1.5 rounded-full">
    {INTENSITY_OPTIONS.map(({ level, label }) => (
      <button
        key={level}
        onClick={() => onChange(level)}
        className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base font-semibold rounded-full transition-colors duration-300 ease-in-out ${
          selected === level
            ? 'bg-white text-gray-800 shadow-md'
            : 'bg-transparent text-gray-600 hover:bg-gray-300/50'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [intensity, setIntensity] = useState<RoastIntensity>(RoastIntensity.Spicy);
  const [roast, setRoast] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');

  const handleRoastMe = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Enthina mone/mole veruthe aalkare budhimuttikunne? Type something first!');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShowResult(true);
    setIsTypingComplete(false);
    setCopyButtonText('Copy');
    
    const generatedRoast = await generateRoast(userInput, intensity);
    setRoast(generatedRoast);
    setIsLoading(false);
  }, [userInput, intensity]);
  
  const handlePlayAgain = () => {
    setUserInput('');
    setRoast('');
    setError(null);
    setShowResult(false);
    setIsTypingComplete(false);
    setCopyButtonText('Copy');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(roast);
    setCopyButtonText('Copied! 👍');
    setTimeout(() => setCopyButtonText('Copy'), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 transform transition-all duration-500 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            AI Roast Machine <span className="text-orange-600">🔥</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Malayalam + English Fun Roaster App</p>
        </div>

        {!showResult ? (
          <div className="space-y-6 animate-fade-in">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ente name Leo / I like coding..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 resize-none"
              rows={3}
            />
            <IntensitySelector selected={intensity} onChange={setIntensity} />
            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
            <button
              onClick={handleRoastMe}
              disabled={isLoading}
              className="w-full bg-orange-600 text-white font-bold py-4 text-xl rounded-lg hover:bg-orange-700 active:scale-95 transition-transform duration-200 ease-in-out shadow-lg hover:shadow-xl disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Roasting...
                </>
              ) : (
                '🔥 Roast Me!'
              )}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="bg-gray-50 p-6 rounded-lg min-h-[120px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
                   <p className="mt-2 text-gray-600">Perfecting the roast...</p>
                </div>
              ) : error ? (
                <p className="text-red-500 font-semibold">{error}</p>
              ) : (
                <TypingEffect text={roast} onComplete={() => setIsTypingComplete(true)} />
              )}
            </div>

            {isTypingComplete && (
              <div className="flex justify-center items-center space-x-4 animate-fade-in-up">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center space-x-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <CopyIcon className="w-5 h-5" />
                  <span>{copyButtonText}</span>
                </button>
                <button
                  onClick={handlePlayAgain}
                  className="flex items-center space-x-2 bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <PlayAgainIcon className="w-5 h-5" />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>
        )}

        <footer className="mt-8 text-center border-t border-gray-200 pt-4">
          <a
            href="https://github.com/your-username/ai-roast-machine" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-300"
            aria-label="View source code on GitHub"
          >
            <GitHubIcon className="w-5 h-5 mr-2" />
            <span>View on GitHub</span>
          </a>
        </footer>
      </main>
    </div>
  );
};

export default App;