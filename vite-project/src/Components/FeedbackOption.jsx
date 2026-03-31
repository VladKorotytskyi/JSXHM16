export const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    {options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onLeaveFeedback(option)}
        style={{ textTransform: 'capitalize', cursor: 'pointer' }}
      >
        {option}
      </button>
    ))}
  </div>
);

