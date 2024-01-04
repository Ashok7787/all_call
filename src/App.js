import './App.css';
import { useState } from 'react';
import Header from './Component/Header';
import Footer from './Component/Footer';
import AllCallList from './Container/Call/AllCallList';
import InboxCall from './Container/Call/InboxCall';

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="overflow-y-scroll relative no-scrollbar h-screen w-screen p-0 bottom-0 top-0 right-0 left-0">
      <div className=' left-0 right-0 sticky top-0 h-20 w-full p-2 border shadow-md' style={{ zIndex: 9999 }}>
        <Header />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => handleTabClick('tab1')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            onClick={() => handleTabClick('tab2')}
          >
            Inbox
          </button>

        </div>

        <div className="mt-4">
          {activeTab === 'tab1' && <div> <AllCallList /></div>}
          {activeTab === 'tab2' && <div><InboxCall /></div>}

        </div>
      </div>

      {/* <div className=' left-0 right-0 sticky z-[9999] bottom-0 h-20 w-full p-2 border shadow-md'>
        <Footer />
      </div> */}

    </div>
  );
}

export default App;
