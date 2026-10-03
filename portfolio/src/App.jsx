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
              <li>52 BC – Gallic Wars: Vercingetorix, leader of the Gauls, surrenders to the Romans under Julius Caesar, ending the siege and battle of Alesia.</li>
              <li>1574 – The Siege of Leiden is lifted by the Watergeuzen.</li>
              <li>1392 – Muhammed VII becomes the twelfth sultan of the Emirate of Granada.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1873 – Chief Kintpuash and companions are hanged for their part in the Modoc War of northern California.</li>
              <li>1862 – American Civil War: The two-day Second Battle of Corinth begins as Confederate forces under General Earl Van Dorn attack Union defenses led by General William Rosecrans around Corinth, Mississippi.</li>
              <li>1739 – The Treaty of Niš is signed by the Ottoman Empire and Russia ending the Russian–Turkish War.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1957 – The California State Superior Court rules that the book Howl and Other Poems is not obscene.</li>
              <li>1981 – The hunger strike at the Maze Prison in Northern Ireland ends after seven months and ten deaths.</li>
              <li>2024 – Bengali, Assamese, Marathi, Pali and Prakrit are accorded the Classical language status by the Government of India</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1390 – Humphrey, Duke of Gloucester (died 1447)</li>
              <li>1458 – Saint Casimir, Prince of Poland and Duke of Lithuania (died 1484)</li>
              <li>1554 – Fulke Greville, 1st Baron Brooke, English poet (died 1628)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1869 – Alfred Flatow, German gymnast (died 1942)</li>
              <li>1797 – Leopold II, Grand Duke of Tuscany (died 1870)</li>
              <li>1800 – George Bancroft, American historian and politician, 17th United States Secretary of the Navy (died 1891)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1958 – Chen Yanyin, Chinese sculptor</li>
              <li>1980   – Ivan Turina, Croatian footballer (died 2013)</li>
              <li>1901 – Jean Grémillon, French director, composer, and screenwriter (died 1959)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>900 – Muhammad ibn Zayd, Tabaristan emir</li>
              <li>42 BC – Gaius Cassius Longinus, Roman politician (born 85 BC)</li>
              <li>723 – Elias I of Antioch, Syriac Orthodox Patriarch of Antioch.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1873 – Kintpuash, American tribal leader (born 1837)</li>
              <li>1833 – François, Marquis de Chasseloup-Laubat, French general and engineer (born 1754)</li>
              <li>1891 – Édouard Lucas, French mathematician and theorist (born 1842)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1994   – Dub Taylor, American actor (born 1907)</li>
              <li>2015   – Javed Iqbal, Pakistani philosopher and judge (born 1925)</li>
              <li>1911 – Rosetta Jane Birks, Australian suffragist (born 1856)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
