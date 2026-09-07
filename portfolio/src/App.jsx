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
              <li>1565 – Arrival of the so-called Grande Soccorso ("great relief") by Philip II of Spain to the Great Siege of Malta.</li>
              <li>878 – Louis the Stammerer is crowned as king of West Francia by Pope John VIII.</li>
              <li>1571 – Thomas Howard, 4th Duke of Norfolk, is arrested for his role in the Ridolfi plot to assassinate Queen Elizabeth I of England and replace her with Mary, Queen of Scots.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1764 – Election of Stanisław August Poniatowski as the last ruler of the Polish–Lithuanian Commonwealth.</li>
              <li>1864 – American Civil War: Atlanta is evacuated on orders of Union General William Tecumseh Sherman.</li>
              <li>1856 – The Saimaa Canal is inaugurated.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1978 – While walking across Waterloo Bridge in London, Bulgarian dissident Georgi Markov is assassinated by Bulgarian secret police agent Francesco Gullino by means of a ricin pellet fired from a specially designed umbrella.</li>
              <li>1929 – Steamer Kuru capsizes and sinks on Lake Näsijärvi near Tampere in Finland. One hundred thirty-six lives are lost.</li>
              <li>1923 – The International Criminal Police Organization (INTERPOL) is formed.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1500 – Sebastian Newdigate, Carthusian monk and martyr (died 1535)</li>
              <li>1438 – Louis II, Landgrave of Lower Hesse (died 1471)</li>
              <li>1448 – Henry, Count of Württemberg-Montbéliard (1473–1482) (died 1519)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1810 – Hermann Heinrich Gossen, Prussian economist and academic (died 1858)</li>
              <li>1895 – Jacques Vaché, French author and poet (died 1919)</li>
              <li>1815 – John McDouall Stuart, Scottish explorer and surveyor (died 1866)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1923   – Peter Lawford, English-American actor (died 1984)</li>
              <li>1994   – Maren Lundby, Norwegian former ski jumper</li>
              <li>1965   – Darko Pančev, Macedonian footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1496 – Ferdinand II of Naples (born 1469)</li>
              <li>1202 – William of the White Hands, French cardinal (born 1135)</li>
              <li>859 – Emperor Xuānzong of Tang, Chinese emperor (born 810)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1741 – Blas de Lezo, Spanish admiral (born 1689)</li>
              <li>1891 – Lorenzo Sawyer, American lawyer and judge (born 1820)</li>
              <li>1644 – Guido Bentivoglio, Italian cardinal and historian (born 1579)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2015   – Voula Zouboulaki, Greek actress (born 1924)</li>
              <li>1973 – Holling C. Holling, American author and illustrator (born 1900)</li>
              <li>1929 – Frederic Weatherly, English lawyer, author, and songwriter (born 1848)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
