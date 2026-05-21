import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Opportunities from '../components/OpportunityFind'

const OppoPage = ({ setPage, theme, toggleTheme }) => {
  return (
    <div className="app-container">
      <Header setPage={setPage} currentPage="opportunities" theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content" style={{ display: 'block', width: '100%' }}>
        <Opportunities />
      </main>
      <Footer setPage={setPage} />
    </div>
  )
}

export default OppoPage
