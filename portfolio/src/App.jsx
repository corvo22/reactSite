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
              <li>1520 – Charles V is crowned as Holy Roman Emperor.</li>
              <li>1377 – Tvrtko I is crowned the first king of Bosnia.</li>
              <li>1185 – The Uprising of Asen and Peter begins on the feast day of St. Demetrius of Thessaloniki and ends with the creation of the Second Bulgarian Empire.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1892 – Ida B. Wells publishes Southern Horrors: Lynch Law in All Its Phases.</li>
              <li>1813 – War of 1812: A combined force of British regulars, Canadian militia and Mohawks defeat the United States Army in the Battle of the Chateauguay.</li>
              <li>1825 – The Erie Canal opens, allowing direct passage from the Hudson River to Lake Erie.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1944 – World War II: The Battle of Leyte Gulf ends with an overwhelming American victory.</li>
              <li>1942 – World War II: In the Battle of the Santa Cruz Islands during the Guadalcanal Campaign, one U.S. aircraft carrier is sunk and another carrier is heavily damaged, while two Japanese carriers and one cruiser are heavily damaged.</li>
              <li>1917 – World War I: Brazil declares war on the Central Powers.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1483 – Hans Buchner, German Renaissance composer (died 1538)</li>
              <li>1564 – Hans Leo Hassler, German organist and composer (died 1612)</li>
              <li>1491 – Zhengde Emperor of China (died 1521)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1874 – Martin Lowry, English chemist and academic (died 1936)</li>
              <li>1860 – Frank Eaton, American marshal and author (died 1958)</li>
              <li>1873 – A. K. Fazlul Huq, Bangladeshi-Pakistani lawyer and politician, 5th Pakistani Minister of Interior (died 1962)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1903 – Mahn Ba Khaing, Burmese politician (died 1947)</li>
              <li>1985 – Andrea Bargnani, Italian basketball player</li>
              <li>1905 – George Bernard Flahiff, Canadian cardinal (died 1989)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1440 – Gilles de Rais, French lord (born c. 1405)</li>
              <li>1555 – Olympia Fulvia Morata, Italian-German scholar and educator (born 1526)</li>
              <li>760 – Cuthbert, archbishop of Canterbury</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1890 – Carlo Collodi, Italian journalist and author (born 1826)</li>
              <li>1896 – Paul-Armand Challemel-Lacour, French philosopher, academic, and politician, French Minister of Foreign Affairs (born 1827)</li>
              <li>1864 – William T. Anderson, American captain (born 1838)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2004 – Bobby Ávila, Mexican baseball player and politician (born 1924)</li>
              <li>2009   – Yoshirō Muraki, Japanese production designer and art director(born 1924)</li>
              <li>2012   – Alan Kirschenbaum, American director, producer, and screenwriter (born 1961)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
