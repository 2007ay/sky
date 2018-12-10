import React from 'react';
import NavHeader from './NavHeader';
import SearchSummary from './SearchSummary';
import ItineraryList from '../components/Itinerary';

import STYLES from './App.scss';
import Header from './Header';

const c = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={c('App')}>
    <Header />
    <SearchSummary />
    <NavHeader />
    <main className={c('App__main')}>
      <ItineraryList />
    </main>
  </div>
);

export default App;
