import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css'

function SpotifyContent() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recent-tracks');
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
    endpoint = `http://localhost:8080/api/sections/${sectionId}`
  }
  else {
    endpoint = `http://localhost:8080/api/projects/${sectionId}`
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
              <li>624 – First Eid al-Fitr celebration.</li>
              <li>590 – Emperor Maurice proclaims his son Theodosius as co-emperor of the Byzantine Empire.</li>
              <li>1021 – The death of the Fatimid caliph al-Hakim bi-Amr Allah, kept secret for six weeks, is announced, along with the succession of his son, al-Zahir li-i'zaz Din Allah.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1697 – Safavid government troops take control of Basra.</li>
              <li>1830 – The Book of Mormon is published in Palmyra, New York.</li>
              <li>1651 – Silver-loaded Spanish ship San José is pushed south by strong winds, subsequently it wrecks in the coast of southern Chile and its surviving crew is killed by indigenous Cuncos.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1922 – The German Social Democratic Party is founded in Poland.</li>
              <li>1982 – A groundbreaking ceremony for the Vietnam Veterans Memorial is held in Washington, D.C.</li>
              <li>1991 – Argentina, Brazil, Uruguay and Paraguay sign the Treaty of Asunción, establishing Mercosur, the South Common Market.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1516 – Conrad Gessner, Swiss botanist and zoologist (d. 1565)</li>
              <li>1554 – Charles of Lorraine, duke of Mayenne (d. 1611)</li>
              <li>1584 – John II, duke of Zweibrücken (d. 1635)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1829   – Georg Andreas Bull, Norwegian architect (d. 1917)</li>
              <li>1884   – Georges Imbert, French chemical engineer and inventor (d. 1950)</li>
              <li>1898 – Rudolf Dassler, German businessman, founded Puma SE (d. 1974)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1992   – Stoffel Vandoorne, Belgian racing driver</li>
              <li>1962   – Kevin Seitzer, American baseball player and coach</li>
              <li>1911   – J. L. Austin, English philosopher and academic (d. 1960)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>903 – Sugawara no Michizane, Japanese poet</li>
              <li>1402 – David Stewart, Duke of Rothesay, heir to the throne of Scotland (b. 1378)</li>
              <li>1535 – Georg Tannstetter, Austrian mathematician, astronomer, and cartographer (b. 1482)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1625 – Giambattista Marini, Italian poet (b. 1569)</li>
              <li>1888 – Barghash bin Said of Zanzibar (b. 1837)</li>
              <li>1793 – John Mudge, English physician and engineer (b. 1721)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2014 – Roger Birkman, American psychologist and author (b. 1919)</li>
              <li>1983 – Anthony Blunt, English historian and spy (b. 1907)</li>
              <li>1993 – Louis Falco, American dancer and choreographer (b. 1942)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
