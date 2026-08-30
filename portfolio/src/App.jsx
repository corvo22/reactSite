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
              <li>1594 – King James VI of Scotland holds a masque at the baptism of Prince Henry at Stirling Castle.</li>
              <li>1057 – Elderly Byzantine Emperor Michael VI Bringas abdicates after just one year on the throne.</li>
              <li>1590 – Tokugawa Ieyasu enters Edo Castle. (Traditional Japanese date: August 1, 1590)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1791 – HMS Pandora sinks after having run aground on the outer Great Barrier Reef the previous day.</li>
              <li>1873 – Austrian explorers Julius von Payer and Karl Weyprecht discover the archipelago of Franz Josef Land in the Arctic Sea.</li>
              <li>1813 – First Battle of Kulm: French forces are defeated by an Austrian-Prussian-Russian alliance.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1967 – Thurgood Marshall is confirmed as the first African American Justice of the Supreme Court of the United States.</li>
              <li>2023 – Gabonese coup d'état: After Ali Bongo Ondimba's reelection, a military coup ousts him, ending 56 years of Bongo family rule in Gabon.</li>
              <li>1974   – The Third World Population Conference ends in Bucharest, Romania. At the end of the ceremony, the UN-Romanian Demographic Centre is inaugurated.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1574 – Albert Szenczi Molnár, Hungarian writer and translator (died 1634)</li>
              <li>1334 – Peter of Castile (died 1369)</li>
              <li>1887 – Paul Kochanski, Polish violinist and composer (died 1934)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1852 – Jacobus Henricus van 't Hoff, Dutch chemist and academic, Nobel Prize laureate (died 1911)</li>
              <li>1898 – Shirley Booth, American actress and singer (died 1992)</li>
              <li>1927   – Piet Kee, Dutch organist and composer (died 2018)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1983   – Gustavo Eberto, Argentine footballer (died 2007)</li>
              <li>1943   – Colin Dann, English author</li>
              <li>1131 – Hervey le Breton, bishop of Bangor and Ely</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1329 – Khutughtu Khan Kusala, Chinese emperor (born 1300)</li>
              <li>1428 – Emperor Shōkō of Japan (born 1401)</li>
              <li>1621 – Bahāʾ al-dīn al-ʿĀmilī, co-founder of Isfahan School of Islamic Philosophy (born 1547)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1896 – Aleksey Lobanov-Rostovsky, Russian politician and diplomat, Minister of Foreign Affairs for Russia (born 1824)</li>
              <li>1751 – Christopher Polhem, Swedish physicist and engineer (born 1661)</li>
              <li>2024   – Fatman Scoop, American rapper, hype man and radio personality (born 1971)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1991   – Jean Tinguely, Swiss painter and sculptor (born 1925)</li>
              <li>2015   – Oliver Sacks, English-American neurologist, author, and academic (born 1933)</li>
              <li>1993 – Louis Falco, American dancer and choreographer (b. 1942)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
