import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css'

function SpotifyContent() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await fetch('/api/recent-tracks');
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recent tracks:', err);
      }
    };

    fetchRecentTracks();
    // refresh every 5 minutes
    const intervalId = setInterval(fetchRecentTracks, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return(
    <ul>
      {tracks.map((track, index) => (
        <li  key={index}> {track.name} <br/> {track.artist}</li>
      ))}
    </ul>
  )

}

function SectionContent({contentType, sectionId, onContentChange }) {
  const [markdownContent, setMarkdownContent] = useState('');
  var endpoint;

  if(contentType == "section") {
    endpoint = `/api/sections/${sectionId}`
  }
  else {
    endpoint = `/api/projects/${sectionId}`
  }


  // defaults to a GET
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.text())
      .then(markdown => setMarkdownContent(markdown))
      .catch(error => console.error(error))
  }, [endpoint]);

  return (
    <ReactMarkdown
      components={{
        // For react-markdown v6+, this is how you handle code blocks
        code({children}) {
          // Log the entire props to see what's available
          
          // The code content is in the children prop
          const codeContent = String(children).trim();
          
          if(codeContent.startsWith('button')) {
            const [, contentType, content, text] = codeContent.split(':')
          
            return (
              <button className='button round-button' onClick={() => onContentChange({ contentType: contentType, content: content}) }>{text}</button>
            )

          }
        }
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
}

function App() {
  const [contentState, setContent] = useState({contentType: "section", content: "about"});
  return (
    <div className="layout-container">
      <div className="left-col">
        <div className="icon">
          <img src="/dnd_char.png" alt="My Current DnD character, an elf paladin"></img>
        </div>
        <div className="spotify">
          <p>Most Recent Spotify Songs:</p>
          <SpotifyContent />
        </div>
      </div>
      <div className="right-col">
        <nav>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "about"}) }>About</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "resume"}) }>Resume</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "projects"}) }>Projects</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Writing</button>
          <button className="button" onClick={() => location.href='https://github.com/corvo22?tab=repositories'}>Git</button>
        </nav>
        <div className="content-area">
            <div className="display-screen"> 
              <SectionContent contentType={contentState.contentType} sectionId={contentState.content} onContentChange={setContent}/>
            </div>
          <div className="today-info">
            <h2>Events:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1238 – King James I of Aragon conquers Valencia from the Moors. Shortly thereafter, he proclaims himself king of Valencia.</li>
              <li>1213 – Queen consort Gertrude of Merania is assassinated by a group of Hungarian lords.</li>
              <li>995 – Boleslaus II, Duke of Bohemia, kills most members of the rival Slavník dynasty.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1644 – A Hospitaller galley squadron defeats an Ottoman convoy in the action of 28 September 1644.</li>
              <li>1871 – The Brazilian Parliament passes a law that frees all children thereafter born to slaves, and all government-owned slaves.</li>
              <li>1844 – Oscar I of Sweden–Norway is crowned king of Sweden.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1983 – John Pat, a 16-year old Aboriginal Australian boy, dies of injuries sustained by four off-duty police officers in Roebourne, a catalyst to the Royal Commission into Aboriginal Deaths in Custody.</li>
              <li>1975 – The Spaghetti House siege, in which nine people are taken hostage, takes place in London.</li>
              <li>2014 – The 2014 Hong Kong protests begin in response to restrictive political reforms imposed by the NPC in Beijing.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1494 – Agnolo Firenzuola, Italian poet and playwright (died 1545)</li>
              <li>1555 – Henri de La Tour d'Auvergne, Marshal of France (died 1623)</li>
              <li>616 – Javanshir, King of Caucasian Albania (died 680)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1852 – Henri Moissan, French chemist and academic, Nobel Prize laureate (died 1907)</li>
              <li>1852   – Isis Pogson, British astronomer and meteorologist (died 1945)</li>
              <li>1809 – Alvan Wentworth Chapman, American physician and botanist (died 1899)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1974   – Shane Webcke, Australian rugby league player and coach</li>
              <li>1934 – Brigitte Bardot, French actress and animal rights activist (died 2025)</li>
              <li>1969   – Angus Robertson, Scottish politician</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1582 – George Buchanan, Scottish historian and scholar (born 1506)</li>
              <li>1213 – Gertrude of Merania, queen consort of Hungary (born 1185)</li>
              <li>1330 – Elizabeth of Bohemia, queen consort of Bohemia (born 1292)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1694 – Gabriel Mouton, French mathematician and theologian (born 1618)</li>
              <li>1895 – Louis Pasteur, French chemist and microbiologist (born 1822)</li>
              <li>1899 – Giovanni Segantini, Austrian painter (born 1858)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1990 – Larry O'Brien, American businessman and politician, 57th United States Postmaster General (born 1917)</li>
              <li>1953 – Edwin Hubble, American astronomer and scholar (born 1889)</li>
              <li>1938 – Charles Duryea, American engineer and businessman, founded the Duryea Motor Wagon Company  (born 1861)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
