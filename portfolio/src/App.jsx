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
              <li>786 – "Night of the three Caliphs": Harun al-Rashid becomes the Abbasid caliph upon the death of his brother al-Hadi. Birth of Harun's son al-Ma'mun.</li>
              <li>1146 – Seljuk atabeg Imad al-Din Zengi of Mosul is assassinated by a slave and succeeded by his quarrelling sons.</li>
              <li>1141 – An army of queen Matilda defeats and disperses an army of empress Matilda which was besieging Winchester. Robert of Gloucester is captured and exchanged for king Stephen, husband of queen Matilda.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1685 – Morean War: the Battle of Kalamata ends in a Venetian victory over the forces of the Ottoman Empire under the Kapudan Pasha.</li>
              <li>1862 – American Civil War: The Battle of South Mountain, part of the Maryland Campaign, is fought.</li>
              <li>1846 – Jang Bahadur and his brothers massacre about 40 members of the Nepalese palace court.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1984 – Joe Kittinger becomes the first person to fly a gas balloon alone across the Atlantic Ocean.</li>
              <li>1979 – Afghan leader Nur Muhammad Taraki is assassinated upon the order of Hafizullah Amin, who becomes the new General Secretary of the People's Democratic Party.</li>
              <li>1939 – World War II: The Estonian military boards the Polish submarine ORP Orzeł in Tallinn, sparking a diplomatic incident that the Soviet Union will later use to justify the annexation of Estonia.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1032 – Dao Zong, Chinese emperor (died 1101)</li>
              <li>1384 – Ephraim of Nea Makri, Greek martyr and saint (died 1426)</li>
              <li>1580 – Francisco de Quevedo, Spanish poet and politician (died 1645)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1656 – Thomas Baker, English historian and author (died 1746)</li>
              <li>1898 – Lawrence Gellert, Hungarian-American musicologist and song collector (died 1979)</li>
              <li>1880 – Benjamin, Russian bishop and missionary (died 1961)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1910 – Lehman Engel, American composer and conductor (died 1982)</li>
              <li>1930   – Eugene I. Gordon, American physicist and engineer (died 2014)</li>
              <li>1978 – Ben Cohen, English rugby union player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1321 – Dante Alighieri, Italian writer (born 1265)</li>
              <li>1404 – Albert IV, duke of Austria (born 1377)</li>
              <li>1146 – Imad ad-Din Zengi, Syrian ruler (born 1087)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1852   – Arthur Wellesley, 1st Duke of Wellington, Irish-English field marshal and politician, Prime Minister of the United Kingdom (born 1769)</li>
              <li>1807 – George Townshend, 1st Marquess Townshend, English field marshal and politician, Lord Lieutenant of Ireland (born 1724)</li>
              <li>1836 – Aaron Burr, American colonel and politician, 3rd Vice President of the United States (born 1756)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2015   – Martin Kearns, English drummer (born 1977)</li>
              <li>1982 – Christian Ferras, French violinist (born 1933)</li>
              <li>2005   – Vladimir Volkoff, French soldier and author (born 1932)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
