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
              <li>1574 – Guru Ram Das becomes the Fourth Sikh Guru/Master.</li>
              <li>1464 – Paul II succeeds Pius II as pope of the Catholic Church.</li>
              <li>70 – Titus ends the siege of Jerusalem after destroying Herod's Temple.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1799 – The entire Dutch fleet is captured by British forces under the command of Sir Ralph Abercromby and Admiral Sir Charles Mitchell during the War of the Second Coalition.</li>
              <li>1813   – Creek War: Fort Mims massacre: Creek "Red Sticks" kill over 500 settlers (including over 250 armed militia) in Fort Mims, north of Mobile, Alabama.</li>
              <li>1721 – The Great Northern War between Sweden and Russia ends in the Treaty of Nystad.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1981 – President Mohammad-Ali Rajai and Prime Minister Mohammad-Javad Bahonar of Iran are assassinated in a bombing. The office of Iran's Prosecutor General blames the People's Mujahedin of Iran.</li>
              <li>1974   – The Third World Population Conference ends in Bucharest, Romania. At the end of the ceremony, the UN-Romanian Demographic Centre is inaugurated.</li>
              <li>1909 – Burgess Shale fossils are discovered by Charles Doolittle Walcott.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1574 – Albert Szenczi Molnár, Hungarian writer and translator (died 1634)</li>
              <li>1334 – Peter of Castile (died 1369)</li>
              <li>1858 – Ignaz Sowinski, Galician architect (died 1917)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1812 – Agoston Haraszthy, Hungarian-American businessman, founded Buena Vista Winery (died 1869)</li>
              <li>1884 – Theodor Svedberg, Swedish chemist and physicist, Nobel Prize laureate (died 1971)</li>
              <li>1977   – Michael Gladis, American actor</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1934 – Antonio Cabangon Chua, Filipino media mogul and businessman (died 2016)</li>
              <li>1984   – Michael Grant Terry, American actor</li>
              <li>1131 – Hervey le Breton, bishop of Bangor and Ely</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1580 – Emmanuel Philibert, Duke of Savoy (born 1528)</li>
              <li>1483 – Louis XI, King of France (born 1423)</li>
              <li>1896 – Aleksey Lobanov-Rostovsky, Russian politician and diplomat, Minister of Foreign Affairs for Russia (born 1824)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – John Bell Hood, American/Confederate general (born 1831)</li>
              <li>1886 – Ferris Jacobs, Jr., American general and politician (born 1836)</li>
              <li>2008 – Brian Hambly, Australian rugby player and coach (born 1937)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2013   – Leo Lewis, American football player and coach (born 1933)</li>
              <li>2024 – Tūheitia Paki, Māori King (born 1955)</li>
              <li>1993 – Louis Falco, American dancer and choreographer (b. 1942)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
