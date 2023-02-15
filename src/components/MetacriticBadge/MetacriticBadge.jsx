import "./MetacriticBadge.css";

export default function MetacriticBadge({ score, link }) {

  // returns a color scheme based on metacritic score
  const scoreColor = (() => {
    if (score >= 90) return "_90";
    else if (score >= 75) return "_75";
    else if (score >= 60) return "_60";
    else return "red";
  })();
  
  // renders a badge that doubles as a link to metacritic.com
  return (
    <div className={`badge ${scoreColor}`}>
      <a href={link} target="_blank" rel="noopener noreferrer"> 
        <span className={scoreColor}>{score}</span>
      </a>
    </div>
  );
}
