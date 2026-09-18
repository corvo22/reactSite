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
              <li>1066 – Norwegian king Harald Hardrada lands with Tostig Godwinson at the mouth of the Humber River and begins his invasion of England.</li>
              <li>96 – Emperor Domitian is assassinated as a result of a plot by his wife Domitia and two Praetorian prefects. Nerva is then proclaimed as his successor.</li>
              <li>1544 – The expedition of Juan Bautista Pastene makes landfall in San Pedro Bay, southern Chile, claiming the territory for Spain.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1850 – The U.S. Congress passes the Fugitive Slave Act of 1850.</li>
              <li>1873 – The U.S. bank Jay Cooke & Company declares bankruptcy, contributing to the Panic of 1873.</li>
              <li>1897 – Veal Oscar, a dish of veal, seafood, asparagus, and Bernaise sauce, is first served at the  Grand Hotel in Stockholm, in honour of the 25th anniversary of the reign of King Oscar II of Sweden and Norway.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1988   – The Magna Charta Universitatum, asserting key principles essential to the free operation of universities, is signed in Bologna by the rectors of 388 institutions of higher learning, to commemorate the 900th anniversary of the University of Bologna.</li>
              <li>1974 – Hurricane Fifi strikes Honduras with 110 mph winds, killing 5,000 people.</li>
              <li>1934 – The Soviet Union is admitted to the League of Nations.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1554 – Haydar Mirza Safavi, Safavid prince (died 1576)</li>
              <li>1091 – Andronikos Komnenos, Byzantine prince and general (died 1130/31)</li>
              <li>1344 – Marie of France, Duchess of Bar (died 1404)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1894 – Fay Compton, English actress (died 1978)</li>
              <li>1886 – Powel Crosley Jr., American entrepreneur (died 1961)</li>
              <li>1857 – John Hessin Clarke, American lawyer and judge (died 1945)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1997 – Viktor Hovland, Norwegian professional golfer</li>
              <li>1916   – John Jacob Rhodes, American lawyer and politician (died 2003)</li>
              <li>1924 – J. D. Tippit, American police officer (died 1963)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1180 – Louis VII, king of France (born 1120)</li>
              <li>893 – Zhang Xiong, Chinese warlord</li>
              <li>1385 – Balša II, ruler of Zeta</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1783   – Benjamin Kennicott, English theologian and scholar (born 1718)</li>
              <li>1857 – Karol Kurpiński, Polish composer and conductor (born 1785)</li>
              <li>1783 – Leonhard Euler, Swiss mathematician and physicist (born 1707)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2007 – Pepsi Tate, Welsh bass player and producer (born 1965)</li>
              <li>1958 – Olaf Gulbransson, Norwegian painter and illustrator (born 1873)</li>
              <li>1945 – Volin, Russian anarchist intellectual (born 1882)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
