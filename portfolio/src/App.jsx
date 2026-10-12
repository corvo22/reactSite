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
              <li>1279 – The Nichiren Shōshū branch of Buddhism is founded in Japan.</li>
              <li>166 AD – Roman emperors Marcus Aurelius and Lucius Verus celebrate a triumph in Rome for the successful completion of their war with the Partians.</li>
              <li>1406 – Chen Yanxiang, the only person from Indonesia known to have visited dynastic Korea, reaches Seoul after having set out from Java four months before.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1799 – Jeanne Geneviève Labrosse becomes the first woman to jump from a balloon with a parachute.</li>
              <li>1793 – The cornerstone of Old East, the oldest state university building in the United States, is laid at the University of North Carolina at Chapel Hill.</li>
              <li>1654 – The Delft Explosion devastates the city in the Netherlands, killing more than 100 people.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1917 – World War I: The First Battle of Passchendaele takes place resulting in the largest single-day loss of life in New Zealand history.</li>
              <li>1901 – President Theodore Roosevelt officially renames the "Executive Mansion" to the White House.</li>
              <li>1976 – Indian Airlines Flight 171 crashes at Santacruz Airport in Bombay, India, killing 95.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1350 – Dmitri Donskoi, Grand Duke of Moscow (died 1389)</li>
              <li>1008 – Go-Ichijō, emperor of Japan (died 1036)</li>
              <li>1576 – Thomas Dudley, English-American soldier and politician, 3rd Governor of the Massachusetts Bay Colony (died 1653)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1602 – William Chillingworth, English scholar and theologian (died 1644)</li>
              <li>1815 – William J. Hardee, American general (died 1873)</li>
              <li>1614 – Henry More, English philosopher (died 1687)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1935 – Luciano Pavarotti, Italian tenor and actor (died 2007)</li>
              <li>1914 – John E. Hodge, African-American chemist (died 1996)</li>
              <li>1932 – Dick Gregory, American comedian, actor, and author (died 2017)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1176 – William d'Aubigny, 1st Earl of Arundel, English politician (born 1109)</li>
              <li>1600 – Luis de Molina, Spanish priest and philosopher (born 1535)</li>
              <li>1448 – Zhu Quan, Chinese prince, historian and playwright (born 1378)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1730 – Frederick IV, king of Denmark and Norway (born 1671)</li>
              <li>1896 – Christian Emil Krag-Juel-Vind-Frijs, Danish lawyer and politician, 9th Council President of Denmark (born 1817)</li>
              <li>1828 – Ioan Nicolidi of Pindus, Aromanian physician and noble (born 1737)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1965 – Paul Hermann Müller, Swiss chemist and academic, Nobel Prize laureate (born 1899)</li>
              <li>2014   – Roberto Telch, Argentinian footballer and coach (born 1943)</li>
              <li>1972 – Robert Le Vigan, French-Argentinian actor and politician (born 1900)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
