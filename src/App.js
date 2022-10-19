import React, { useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import FetchForm from './components/FetchForm';
import Loader from './components/Loader';
import { Web3ContextProvider } from './stores/web3Context';
import {fetchTransferEvents} from './utils/helpers';

function App() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchEvents = (filter) => {
    setLoading(true);
    fetchTransferEvents(filter.tokenAddress, filter.walletAddress, filter.option).then(results => {
      setEvents(results);
      setLoading(false);
    });
  }
  return (
    <Web3ContextProvider>
      <div className="container">
        <div>
          <FetchForm onFetch={fetchEvents}/>
          {loading ? 
          <Loader message={"Fetching Transfer Events..."}/> :
          events?<EventList events={events}/>:null}
        </div>
      </div>
    </Web3ContextProvider>
  );
}

export default App;
