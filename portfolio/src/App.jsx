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
              <li>1509 – An earthquake known as "The Lesser Judgment Day" hits Constantinople.</li>
              <li>422 – Election of pope Celestine I following the death of pope Boniface I earlier that month.</li>
              <li>1561 – Fourth Battle of Kawanakajima: Takeda Shingen defeats Uesugi Kenshin in the climax of their ongoing conflicts.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1640 – Reapers' War: Junta de Braços (Assembly of Estates) of the Principality of Catalonia summoned. It assumes the sovereignty and enacts a series of revolutionary measures which will lead to the Catalan Republic.</li>
              <li>1724 – Johann Sebastian Bach leads the first performance of Jesu, der du meine Seele, BWV 78, a chorale cantata based on a passion hymn by Johann Rist.</li>
              <li>1813 – The United States defeats a British Fleet at the Battle of Lake Erie during the War of 1812.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1918 – Russian Civil War: The Red Army captures Kazan.</li>
              <li>1939   – World War II: The Canadian declaration of war on Germany receives royal assent.</li>
              <li>1960 – At the Summer Olympics in Rome, Abebe Bikila becomes the first sub-Saharan African to win a gold medal, winning the marathon in bare feet.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1497 – Wolfgang Musculus, German theologian (died 1563)</li>
              <li>904 – Guo Wei, posthumously known as Emperor Taizu of Later Zhou</li>
              <li>1547 – George I, Landgrave of Hesse-Darmstadt (died 1596)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1860 – Marianne von Werefkin, Russian-Swiss painter (died 1938)</li>
              <li>1714 – Niccolò Jommelli, Italian composer (died 1774)</li>
              <li>1890 – Bob Heffron, New Zealand-Australian miner and politician, 30th Premier of New South Wales (died 1978)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1966 – Yuki Saito, Japanese singer and actress</li>
              <li>1984   – Luke Treadaway, English actor</li>
              <li>1997   – Troy Terry, American ice hockey player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1308 – Emperor Go-Nijō of Japan (born 1285)</li>
              <li>952 – Gao Xingzhou, Chinese general (born 885)</li>
              <li>210 BC – Qin Shi Huang, first emperor of China (born 259 BC)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1889 – Charles III, Prince of Monaco (born 1818)</li>
              <li>1759 – Ferdinand Konščak, Croatian missionary and explorer (born 1703)</li>
              <li>1851 – Thomas Hopkins Gallaudet, American minister and educator (born 1787)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1965 – Father Divine, American spiritual leader (born 1880)</li>
              <li>2014 – Emilio Botín, Spanish banker and businessman (born 1934)</li>
              <li>1976 – Dalton Trumbo, American screenwriter and novelist (born 1905)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
