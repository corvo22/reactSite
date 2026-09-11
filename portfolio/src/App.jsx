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
              <li>1185 – Isaac II Angelos kills Stephen Hagiochristophorites and then appeals to the people, resulting in the revolt that deposes Andronikos I Komnenos and places Isaac on the throne of the Byzantine Empire.</li>
              <li>1390 – Lithuanian Civil War (1389–1392): The Teutonic Knights begin a five-week siege of Vilnius.</li>
              <li>1275 – An earthquake occurs in the south of Great Britain, notably causing multiple fatalities as well as destroying St Michael's Church on Glastonbury Tor.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1777 – American Revolutionary War: Battle of Brandywine: The British celebrate a major victory in Chester County, Pennsylvania.</li>
              <li>1802 – France annexes the Kingdom of Piedmont.</li>
              <li>1803 – The Battle of Delhi, during the Second Anglo-Maratha War, between British troops under General Lake, and Marathas of Scindia's army under General Louis Bourquin ends in a British victory.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2007 – Russia tests the largest conventional weapon ever, the Father of All Bombs.</li>
              <li>1970 – The Dawson's Field hijackers release 88 of their hostages. The remaining hostages, mostly Jews and Israeli citizens, are held until September 25.</li>
              <li>1967 – China's People's Liberation Army (PLA) launched an attack on Indian posts at Nathu La, Sikkim, India, which resulted in military clashes.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1465 – Bernardo Accolti, Italian poet (died 1536)</li>
              <li>1522 – Ulisse Aldrovandi, Italian ornithologist and botanist (died 1605)</li>
              <li>600 – Yuknoom Ch'een II, Mayan ruler</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1862   – Hawley Harvey Crippen, American physician (died 1910)</li>
              <li>1764 – Valentino Fioravanti, Italian organist and composer (died 1837)</li>
              <li>1865 – Rainis, Latvian poet and playwright (died 1929)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2001 – Joseph Fahnbulleh, Liberian-American sprinter</li>
              <li>1914 – Serbian Patriarch Pavle II (died 2009)</li>
              <li>1927 – Keith Holman, Australian rugby league player and coach (died 2011)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1599 – Beatrice Cenci, Italian noblewoman (born 1577)</li>
              <li>883 – Kesta Styppiotes, Byzantine general</li>
              <li>1569 – Vincenza Armani, Italian actress (born 1530)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1846 – José Núñez de Cáceres, Dominican politician and writer, leader of the Independence movement of the Dominican Republic (born 1772)</li>
              <li>1680 – Emperor Go-Mizunoo of Japan (born 1596)</li>
              <li>1898 – Nikoline Harbitz, Norwegian author (born 1841)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1959 – Paul Douglas, American actor (born 1907)</li>
              <li>2020 – Toots Hibbert, Jamaican singer and songwriter (born 1942)</li>
              <li>1932 – Stanisław Wigura, Polish pilot and businessman, co-founded the RWD Company (born 1901)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
