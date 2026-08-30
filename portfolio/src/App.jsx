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
              <li>1363 – The five-week Battle of Lake Poyang begins, in which the forces of two Chinese rebel leaders (Chen Youliang and Zhu Yuanzhang) meet to decide who will supplant the Yuan dynasty.</li>
              <li>1057 – Elderly Byzantine Emperor Michael VI Bringas abdicates after just one year on the throne.</li>
              <li>1590 – Tokugawa Ieyasu enters Edo Castle. (Traditional Japanese date: August 1, 1590)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1727 – Anne, eldest daughter of King George II of Great Britain, is given the title Princess Royal.</li>
              <li>1896 – Philippine Revolution: After Spanish victory in the Battle of San Juan del Monte, eight provinces in the Philippines are declared under martial law by the Spanish Governor-General Ramón Blanco y Erenas.</li>
              <li>1813 – First Battle of Kulm: French forces are defeated by an Austrian-Prussian-Russian alliance.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1983 – Aeroflot Flight 5463 crashes into Dolan Mountain while approaching Almaty International Airport in present-day Kazakhstan, killing all 90 people on board.</li>
              <li>1992 – The 11-day Ruby Ridge standoff ends with Randy Weaver surrendering to federal authorities.</li>
              <li>1974   – The Third World Population Conference ends in Bucharest, Romania. At the end of the ceremony, the UN-Romanian Demographic Centre is inaugurated.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1574 – Albert Szenczi Molnár, Hungarian writer and translator (died 1634)</li>
              <li>1334 – Peter of Castile (died 1369)</li>
              <li>1852   – J. Alden Weir, American painter and academic (died 1919)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1893 – Huey Long, American lawyer and politician, 40th Governor of Louisiana (died 1935)</li>
              <li>1884 – Theodor Svedberg, Swedish chemist and physicist, Nobel Prize laureate (died 1971)</li>
              <li>1939 – Elizabeth Ashley, American actress</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1943   – Jean-Claude Killy, French skier</li>
              <li>1972   – Pavel Nedvěd, Czech footballer</li>
              <li>832 – Cui Qun, Chinese chancellor (born 772)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>526 – Theodoric the Great, Italian ruler (born 454)</li>
              <li>1500 – Victor, Duke of Münsterberg and Opava, Count of Glatz (born 1443)</li>
              <li>1604 – John Juvenal Ancina, Italian Oratorian and bishop (born 1545)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1619 – Shimazu Yoshihiro, Japanese samurai and warlord (born 1535)</li>
              <li>1886 – Ferris Jacobs, Jr., American general and politician (born 1836)</li>
              <li>1946 – Konstantin Rodzaevsky, Russian lawyer (born 1907)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1943 – Eddy de Neve, Indonesian-Dutch footballer and lieutenant (born 1885)</li>
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
