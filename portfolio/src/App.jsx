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
              <li>855 – Pope Benedict III is restored by a popular uprising to the papacy after king  Louis II of Italy tried to replace him with his favourite candidate.</li>
              <li>440 – Consecration of pope Leo I, later called Leo the Great, following the death of pope Sixtus III in the month before.</li>
              <li>1227 – Frederick II, Holy Roman Emperor, is excommunicated by Pope Gregory IX for his failure to participate in the Crusades during the Investiture Controversy.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1714 – The Cossacks of the Tsardom of Russia kill about 800 people overnight in Hailuoto during the Great Wrath.</li>
              <li>1848 – The Battle of Pákozd is a stalemate between Hungarian and Croatian forces and is the first battle of the Hungarian Revolution.</li>
              <li>1885 – The first practical public electric tramway in the world is opened in Blackpool, England.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2019 – Violence and low turnout mar the 2019 Afghan presidential election.</li>
              <li>2007 – Calder Hall, the world's first commercial nuclear power station, is demolished in a controlled explosion.</li>
              <li>1990   – The YF-22, which would later become the F-22 Raptor, flies for the first time.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>106 BC – Pompey, Roman general and politician (died 48 BC)</li>
              <li>1402 – Ferdinand the Holy Prince of Portugal (died 1443)</li>
              <li>1527 – John Lesley, Scottish bishop (died 1596)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1758 – Horatio Nelson, 1st Viscount Nelson, English admiral (died 1805)</li>
              <li>1899 – László Bíró, Hungarian-Argentinian journalist and inventor, invented the ballpoint pen (died 1985)</li>
              <li>1863 – Hugo Haase, German lawyer, jurist, and politician (died 1919)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1931 – James Cronin, American physicist and academic, Nobel Prize laureate (died 2016)</li>
              <li>1930 – Richard Bonynge, Australian pianist and conductor</li>
              <li>1915   – Oscar Handlin, American historian and academic (died 2011)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>855 – Lothair I, Carolingian emperor (born 795)</li>
              <li>1186 – William of Tyre, Archbishop of Tyre (born 1130)</li>
              <li>1364 – Charles I, Duke of Brittany (born 1319)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1804 – Michael Hillegas, American politician, 1st Treasurer of the United States (born 1728)</li>
              <li>1889 – Louis Faidherbe, French general and politician (born 1818)</li>
              <li>1642   – William Stanley, 6th Earl of Derby, English politician, Lord Lieutenant of Cheshire (born 1561)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2006   – Michael A. Monsoor, American sailor, Medal of Honor recipient (born 1981)</li>
              <li>1983 – Alan Moorehead, Australian war correspondent and author (born 1910)</li>
              <li>1977 – Robert McKimson, American animator and illustrator (born 1910)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
