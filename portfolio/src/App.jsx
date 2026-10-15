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
              <li>961 – Al-Hakam II becomes caliph of Cordoba upon the death of his father Abd al-Rahman III.</li>
              <li>1582 – Adoption of the Gregorian calendar begins, eventually leading to near-universal adoption.</li>
              <li>1066 – Following the death of Harold II at the Battle of Hastings, Edgar the Ætheling is proclaimed King of England by the Witan; he is never crowned, and concedes power to William the Conqueror two months later.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1781 – The Battle of Raft Swamp marks the last battle fought in North Carolina during the American Revolutionary War with a Patriot victory. It occurred four days before the British surrender at Yorktown.</li>
              <li>1815 – Napoleon begins his exile on Saint Helena in the South Atlantic Ocean.</li>
              <li>1888 – The "From Hell" letter allegedly sent by Jack the Ripper is received by investigators.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2007 – Seventeen activists in New Zealand are arrested in the country's first post-9/11 anti-terrorism raids.</li>
              <li>1928 – The airship Graf Zeppelin completes its first trans-Atlantic flight, landing at Lakehurst, New Jersey, United States.</li>
              <li>1979   – A coup d'état in El Salvador overthrows President Carlos Humberto Romero and begins the 12 year-long Salvadoran Civil War.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1542 – Akbar, Mughal emperor (died 1605)</li>
              <li>1471 – Konrad Mutian, German epigrammatist and academic (died 1526)</li>
              <li>1564 – Henry Julius, Duke of Brunswick-Lüneburg (died 1613)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1784 – Thomas Robert Bugeaud, French general and politician, Governor-General of Algeria (died 1849)</li>
              <li>1816 – John Robertson, English-Australian politician, 5th Premier of New South Wales (died 1891)</li>
              <li>1762 – Samuel Adams Holyoke, American composer and educator (died 1820)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1959   – Todd Solondz, American actor, director, and screenwriter</li>
              <li>1970 – Ginuwine, American singer-songwriter, dancer, and actor</li>
              <li>1923 – Italo Calvino, Italian novelist, short story writer, and journalist (died 1985)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>412 – Theophilus, Patriarch of Alexandria</li>
              <li>55 BC – Lucretius, Roman poet and philosopher (born 98 BC)</li>
              <li>1564 – Andreas Vesalius, Belgian-Greek anatomist, physician, and author (born 1514)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1817 – Tadeusz Kościuszko, Polish-Lithuanian general and engineer (born 1746)</li>
              <li>1838 – Letitia Elizabeth Landon, English poet and novelist (born 1802)</li>
              <li>1684 – Géraud de Cordemoy, French historian, philosopher and lawyer (born 1626)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2021 – David Amess, British politician, member of Parliament for Southend West (born 1952)</li>
              <li>1910 – Stanley Ketchel, American boxer (born 1886)</li>
              <li>1999 – Josef Locke, British-Irish soldier, policeman, tenor and actor (born 1917)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
