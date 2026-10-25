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
              <li>1147   – Reconquista: After a siege of four months, crusader knights conquer Lisbon.</li>
              <li>285 or 286 – Execution of Saints Crispin and Crispinian during the reign of Diocletian, now the patron saints of leather workers, curriers, and shoemakers.</li>
              <li>1415 – Hundred Years' War: Henry V of England, with his men-at-arms and archers, defeats the larger French army in the Battle of Agincourt.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1812 – War of 1812: The American frigate, USS United States, commanded by Stephen Decatur, captures the British frigate HMS Macedonian.</li>
              <li>1760 – King George III succeeds to the British throne on the death of his grandfather George II.</li>
              <li>1854 – The Battle of Balaclava takes place during the Crimean War. It is soon memorialized in verse as The Charge of the Light Brigade.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1917 – Old Style date of the October Revolution in Russia.</li>
              <li>1927 – The Italian luxury liner SS Principessa Mafalda sinks off the coast of Brazil, killing 314.</li>
              <li>1944   – World War II: The final attempt of the Imperial Japanese Navy to win the war climaxes at the Battle of Leyte Gulf.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1330 – Louis II, Count of Flanders, (died 1384)</li>
              <li>1589 – Jan Stanisław Sapieha, Polish-Lithuanian noble (died 1635)</li>
              <li>1510 – Renée of France (died 1574)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1858 – Take Ionescu, Romanian politician, diplomat, journalist and lawyer (died 1922)</li>
              <li>1864   – Toktogul Satylganov, Kyrgyz Akyn, poet and singer (died 1933)</li>
              <li>1795 – John P. Kennedy, American novelist and Whig politician (died 1870)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1994   – Ray Robson, American chess Grandmaster</li>
              <li>1902   – Eddie Lang, American jazz guitarist (died 1933)</li>
              <li>1967   – Taiyō Matsumoto, Japanese manga artist</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1492 – Thaddeus McCarthy, Irish bishop (born 1455)</li>
              <li>1415   – Philip II, Count of Nevers (born 1389)</li>
              <li>1415   – Dafydd Gam, Welsh nobleman (born c. 1380)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – Charles Hallé, German-English pianist and conductor (born 1819)</li>
              <li>1833 – Abbas Mirza, Persian prince (born 1789)</li>
              <li>1889 – Émile Augier, French playwright (born 1820)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1986 – Forrest Tucker, American actor (born 1919)</li>
              <li>1924 – Ziya Gökalp, Turkish sociologist, poet, and activist (born 1876)</li>
              <li>1957 – Albert Anastasia, Italian-American mob boss (born 1902)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
