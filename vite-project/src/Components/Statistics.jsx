export const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li>Good: {good}</li>
    <li>Neutral: {neutral}</li>
    <li>Bad: {bad}</li>
    <li>Total: {total}</li>
    <li>Positive feedback: {positivePercentage}%</li>
  </ul>
);

