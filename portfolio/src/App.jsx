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
              <li>1400 – Owain Glyndŵr is declared Prince of Wales by his followers.</li>
              <li>681 – Pope Honorius I is posthumously excommunicated by the Sixth Ecumenical Council.</li>
              <li>1410 – Ferdinand of Trastámara takes Antequera from the emirate of Granada.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1880 – The Cornell Daily Sun prints its first issue in Ithaca, New York.</li>
              <li>1620 – Pilgrims set sail for Virginia from Plymouth, England in the Mayflower.</li>
              <li>1893 – Settlers make a land run for prime land in the Cherokee Strip in Oklahoma.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1982 – Lebanon War: The Sabra and Shatila massacre in Lebanon takes place.</li>
              <li>1940 – World War II: Italian troops conquer Sidi Barrani.</li>
              <li>2005 – The Camorra organized crime boss Paolo Di Lauro is arrested in Naples, Italy.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1541 – Walter Devereux, 1st Earl of Essex, English nobleman (died 1576)</li>
              <li>1557 – Jacques Mauduit, French composer (died 1627)</li>
              <li>1295 – Elizabeth de Clare, English noblewoman (died 1360)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1716 – Angelo Maria Amorevoli, Italian tenor and actor (died 1798)</li>
              <li>1782 – Daoguang Emperor of China (died 1850)</li>
              <li>1897 – Milt Franklyn, American composer (died 1962)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1989   – Braden Holtby, Canadian ice hockey player</li>
              <li>1927   – Sadako Ogata, Japanese academic and diplomat, United Nations High Commissioner for Refugees (died 2019)</li>
              <li>1989   – Dustin Tokarski, Canadian ice hockey player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1226 – Pandulf Verraccio, Roman ecclesiastical politician</li>
              <li>1360 – William de Bohun, 1st Earl of Northampton (born 1319)</li>
              <li>1406 – Cyprian, Metropolitan of Moscow (born 1336)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1865 – Christian de Meza, Danish general (born 1792)</li>
              <li>1843 – Ezekiel Hart, Canadian businessman and politician (born 1770)</li>
              <li>1792 – Nguyễn Huệ, Vietnamese emperor (born 1753)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1940 – Charles Cochrane-Baillie, 2nd Baron Lamington, English-Scottish politician, 8th Governor of Queensland (born 1860)</li>
              <li>2009   – Ernst Märzendorfer, Austrian conductor (born 1921)</li>
              <li>2007 – Robert Jordan, American engineer and author (born 1948)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
