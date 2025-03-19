import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css'

function SectionContent({sectionId}) {
  const [markdownContent, setMarkdownContent] = useState('');

  // defaults to a GET
  useEffect(() => {
    fetch(`http://localhost:8080/api/sections/${sectionId}`)
      .then(response => response.text())
      .then(markdown => setMarkdownContent(markdown))
      .catch(error => console.error(error))
  }, [sectionId]);

  return (
    <div className='display-screen'>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

function App() {
  const [currentSection, setCurrentSection] = useState("about");
  return (
    <div className="layout-container">
      <div className="left-col">
        <div className="icon">icon</div>
        <div className="spotify">spotify</div>
      </div>
      <div className="right-col">
        <nav>
          <button className="button" onClick={() => setCurrentSection("about") }>About</button>
          <button className="button" onClick={() => console.log('Go to about')}>Resume</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Projects</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Writing</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Git</button>
        </nav>
        <div className="content-area">
          {currentSection ? (
            <SectionContent sectionId={currentSection} />
          ) : (
            <div className="display-screen"></div>
          )}
          <div className="today-info">info</div>
        </div>
      </div>
    </div>
  );
}

export default App
