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
              <li>44 BC   – Cicero launches the first of his Philippicae (oratorical attacks) on Mark Antony. He will make 14 of them over the following months.</li>
              <li>44 BC – Pharaoh Cleopatra VII of Egypt declares her son co-ruler as Ptolemy XV Caesarion.</li>
              <li>1192 – The Treaty of Jaffa is signed between Richard I of England and Saladin, leading to the end of the Third Crusade.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1862 – American Civil War: United States President Abraham Lincoln reluctantly restores Union General George B. McClellan to full command after General John Pope's disastrous defeat at the Second Battle of Bull Run.</li>
              <li>1898 – Battle of Omdurman: British and Egyptian troops defeat Sudanese tribesmen and establish British dominance in Sudan.</li>
              <li>1806 – A massive landslide destroys the town of Goldau, Switzerland, killing 457.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1944 – The last execution of a Finn in Finland takes place when soldier Olavi Laiho is executed by shooting in Oulu.</li>
              <li>2013 – The Eastern span replacement of the San Francisco–Oakland Bay Bridge opens at 10:15 pm at a cost of $6.4 billion, after the 1989 Loma Prieta earthquake damaged the old span.</li>
              <li>1945 – World War II: The Japanese Instrument of Surrender is signed by Japan and the major warring powers aboard the battleship USS Missouri in Tokyo Bay, thus marking the official end to the war.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1243 – Gilbert de Clare, 7th Earl of Gloucester, 6th Earl of Hertford, English politician (died 1295)</li>
              <li>1531 – Francesco Cattani da Diacceto, Bishop of Fiesole (died 1595)</li>
              <li>1251 – Francis of Fabriano, Italian writer (died 1322)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1778 – Louis Bonaparte, French-Dutch king (died 1846)</li>
              <li>1892 – Dezső Kertész, Hungarian actor and film director (died 1965)</li>
              <li>1853 – Wilhelm Ostwald, Latvian-German chemist and academic, Nobel Prize laureate (died 1932)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1988   – Ishmeet Singh, Indian singer (died 2008)</li>
              <li>1971   – Pawan Kalyan, Indian actor politician</li>
              <li>1923 – René Thom, French mathematician, biologist, and academic (died 2002)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>595 – John IV of Constantinople</li>
              <li>1274 – Prince Munetaka, Japanese shōgun (born 1242)</li>
              <li>1083 – King Munjong of Goryeo (born 1019)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1651 – Kosem Sultan, Ottoman Valide sultan and regent (born 1589)</li>
              <li>1813 – Jean Victor Marie Moreau, French general (born 1763)</li>
              <li>1690 – Philip William, Elector Palatine, German Count Palatine of Neuburg (born 1615)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2013 – Valérie Benguigui, French actress and director (born 1965)</li>
              <li>1954 – Franz Leopold Neumann, German lawyer and political scientist (born 1900)</li>
              <li>1945 – Mason Phelps, American golfer (born 1885)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
