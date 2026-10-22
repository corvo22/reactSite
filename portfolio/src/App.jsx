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
              <li>1383 – The male line of the Portuguese House of Burgundy becomes extinct with the death of King Fernando, leaving only his daughter Beatrice. Rival claimants begin a period of civil war and disorder.</li>
              <li>794 – Japanese Emperor Kanmu relocates his empire's capital to Heian-kyō (now Kyoto).</li>
              <li>906 – Abbasid general Ahmad ibn Kayghalagh leads a raid against the Byzantine Empire, taking 4,000–5,000 captives.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – Using a filament of carbonized thread, Thomas Edison tests the first practical electric incandescent light bulb; the bulb lasted 131⁄2 hours before burning out.</li>
              <li>1859 – Spain declares war on Morocco.</li>
              <li>1797 – André-Jacques Garnerin makes the first recorded parachute jump, from 1,000 metres (3,300 ft) above Paris.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1941 – World War II: French resistance member Guy Môquet and 29 other hostages are executed by the Germans in retaliation for the death of a German officer.</li>
              <li>2005 – Bellview Airlines Flight 210 crashes in Nigeria, killing all 117 people on board.</li>
              <li>2005 – Tropical Storm Alpha forms in the Atlantic Basin, making the 2005 Atlantic hurricane season the most active Atlantic hurricane season until surpassed by the 2020 season.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1511 – Erasmus Reinhold, German astronomer and mathematician (died 1553)</li>
              <li>1071 – William IX, Duke of Aquitaine (died 1126)</li>
              <li>1587 – Joachim Jungius, German mathematician and philosopher (died 1657)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1875 – David van Embden, Dutch economist and politician (died 1962)</li>
              <li>1844 – Louis Riel, Canadian Métis scholar and politician (died 1885)</li>
              <li>1897 – Marjorie Flack, American author and illustrator (died 1958)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1953 – René Arce Islas, Mexican politician</li>
              <li>1965 – A. L. Kennedy, Scottish comedian, journalist, and author</li>
              <li>1967 – Ulrike Maier, Austrian skier (died 1994)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1383 – Ferdinand I of Portugal, Portuguese king (born 1345)</li>
              <li>1493 – James Douglas, 1st Earl of Morton, Scottish earl (born 1426)</li>
              <li>741 – Charles Martel, Frankish political and military leader (born 688)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1708 – Hermann Witsius, Dutch theologian and academic (born 1636)</li>
              <li>1626 – Kikkawa Hiroie, Japanese daimyō (born 1561)</li>
              <li>1885 – Lewis Majendie, English politician (born 1835)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2010 – Eio Sakata, Japanese Go player (born 1920)</li>
              <li>1973 – Pablo Casals, Catalan cellist and conductor (born 1876)</li>
              <li>2009 – Don Lane, American-Australian actor, singer, and talk show host (born 1933)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
