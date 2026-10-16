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
              <li>1367 – Pope Urban V enters Rome, the first pope to do so in more than fifty years since the begin of the Avignon Papacy.</li>
              <li>912 – Abd ar-Rahman III becomes the eighth Emir of Córdoba.</li>
              <li>1590 – Prince Gesualdo of Venosa murders his wife and her lover.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1805 – War of the Third Coalition: Napoleon surrounds the Austrian army at Ulm.</li>
              <li>1834 – Much of the ancient structure of the Palace of Westminster in London burns to the ground.</li>
              <li>1891 –  A diplomatic incident between the United States and Chile occurred after U.S. sailors were attacked in Valparaíso, nearly leading to war.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1968   – Yasunari Kawabata becomes the first Japanese person to be awarded the Nobel Prize in Literature.</li>
              <li>1995   – The Skye Bridge in Scotland is opened.</li>
              <li>2002 – The Bibliotheca Alexandrina opens in Egypt, commemorating the ancient library of Alexandria.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1535 – Niwa Nagahide, Japanese samurai (died 1585)</li>
              <li>1396 – William de la Pole, 1st Duke of Suffolk, English admiral (died 1450)</li>
              <li>1483 – Gasparo Contarini, Italian cardinal and diplomat (died 1542)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1855 – Samad bey Mehmandarov, Azerbaijani general and politician, 3rd Azerbaijani Minister of Defense (died 1931)</li>
              <li>1873 – Juho Kekkonen, Finnish forestry manager and tenant farmer (died 1928)</li>
              <li>1884 – Rembrandt Bugatti, Italian sculptor (died 1916)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1903   – Big Joe Williams, American Delta blues singer-songwriter and guitarist (died 1982)</li>
              <li>1999 – Aaron Nesmith, American basketball player</li>
              <li>1968 – Randall Batinkoff, American actor and producer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1594 – William Allen, English cardinal (born 1532)</li>
              <li>385 – Fu Jian, Chinese emperor (born 337)</li>
              <li>1333 – Nicholas V, antipope of Rome (born 1260)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1793   – John Hunter, Scottish-English surgeon and philosopher (born 1728)</li>
              <li>1730   – Nevşehirli Damat Ibrahim Pasha, Greek politician, 139th Grand Vizier of the Ottoman Empire (born 1666)</li>
              <li>1679 – Roger Boyle, 1st Earl of Orrery, Irish-English soldier and politician (born 1621)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1973 – Gene Krupa, American drummer, composer, and actor (born 1909)</li>
              <li>2010   – Barbara Billingsley, American actress (born 1915)</li>
              <li>1989   – Cornel Wilde, American actor (born 1912)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
