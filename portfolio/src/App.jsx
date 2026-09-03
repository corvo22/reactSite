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
              <li>301 – San Marino, one of the smallest nations in the world and the world's oldest republic still in existence, is founded by Saint Marinus.</li>
              <li>1411 – The Treaty of Selymbria is concluded between the Ottoman Empire and the Republic of Venice.</li>
              <li>590 – Consecration of Pope Gregory I (Gregory the Great).</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1861 – American Civil War: Confederate General Leonidas Polk invades neutral Kentucky, prompting the state legislature to ask for Union assistance.</li>
              <li>1650 – Victory over the royalists in the Battle of Dunbar opens the way to Edinburgh for the New Model Army during the English invasion of Scotland.</li>
              <li>1658 – The death of Oliver Cromwell; Richard Cromwell becomes Lord Protector of England.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1997 – Vietnam Airlines Flight 815 (Tupolev Tu-134) crashes on approach into Phnom Penh airport, killing 64.</li>
              <li>1981 – The Convention on the Elimination of All Forms of Discrimination Against Women, an international bill of rights for women, is instituted by the United Nations.</li>
              <li>1916 – World War I: Leefe Robinson destroys the German airship Schütte-Lanz SL 11 over Cuffley, north of London; the first German airship to be shot down on British soil.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1034 – Emperor Go-Sanjō of Japan (died 1073)</li>
              <li>1568 – Adriano Banchieri, Italian organist and composer (died 1634)</li>
              <li>1900   – Urho Kekkonen, Finnish journalist, lawyer, and politician, 8th President of Finland (died 1986)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1803 – Prudence Crandall, American educator (died 1890)</li>
              <li>1849 – Sarah Orne Jewett, American novelist, short story writer and poet (died 1909)</li>
              <li>1929   – Armand Vaillancourt, Canadian sculptor and painter</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1956   – Pat McGeown, Irish republican activist (died 1996)</li>
              <li>1940 – Frank Duffy, English architect</li>
              <li>1400 – John Holland, 1st Duke of Exeter (born c. 1352)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1420 – Robert Stewart, Duke of Albany (born 1340)</li>
              <li>931 – Uda, emperor of Japan (born 867)</li>
              <li>1729 – Jean Hardouin, French historian and scholar (born 1646)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1808 – John Montgomery, American merchant and politician (born 1722)</li>
              <li>1866 – Konstantin Flavitsky, Russian painter (born 1830)</li>
              <li>2012   – Siegfried Jamrowski, Russian-German soldier and pilot (born 1917)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2013   – Don Meineke, American basketball player (born 1930)</li>
              <li>2000 – Edward Anhalt, American actor, producer, and screenwriter (born 1914)</li>
              <li>1945 – Mason Phelps, American golfer (born 1885)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
