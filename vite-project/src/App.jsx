import { useState, useEffect, useReducer } from "react";
import { Section } from "./Components/Section";
import { FeedbackOptions } from "./Components/FeedbackOption";
import { Notification } from "./Components/Notification";
import { Statistics } from "./Components/Statistics";

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "good":
      return { ...state, good: state.good + 1 };
    case "neutral":
      return { ...state, neutral: state.neutral + 1 };
    case "bad":
      return { ...state, bad: state.bad + 1 };
    default:
      throw new Error("Unknown action type");
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = window.localStorage.getItem("feedback-data");
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    window.localStorage.setItem("feedback-data", JSON.stringify(state));
  }, [state]);

  const handleFeedback = (type) => {
    dispatch({ type });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((state.good / total) * 100) : 0;
  };

  const totalFeedback = countTotalFeedback();
  const options = Object.keys(state);

  return (
    <div style={{ padding: "20px" }}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

export default App;
//   const [feedback, setFeedback] = useState(() => {
//     const savedFeedback = window.localStorage.getItem("feedback-data");
//     return savedFeedback !== null
//       ? JSON.parse(savedFeedback)
//       : { good: 0, neutral: 0, bad: 0 };
//   });

//   useEffect(() => {
//     window.localStorage.setItem("feedback-data", JSON.stringify(feedback));
//   }, [feedback]);

//   const handleFeedback = (type) => {
//     setFeedback((prevState) => ({
//       ...prevState,
//       [type]: prevState[type] + 1,
//     }));
//   };

//   const countTotalFeedback = () => {
//     const { good, neutral, bad } = feedback;
//     return good + neutral + bad;
//   };

//   const countPositiveFeedbackPercentage = () => {
//     const total = countTotalFeedback();
//     return total > 0 ? Math.round((feedback.good / total) * 100) : 0;
//   };

//   const totalFeedback = countTotalFeedback();
//   const options = Object.keys(feedback);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Section title="Please leave feedback">
//         <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
//       </Section>

//       <Section title="Statistics">
//         {totalFeedback > 0 ? (
//           <Statistics
//             good={feedback.good}
//             neutral={feedback.neutral}
//             bad={feedback.bad}
//             total={totalFeedback}
//             positivePercentage={countPositiveFeedbackPercentage()}
//           />
//         ) : (
//           <Notification message="There is no feedback" />
//         )}
//       </Section>
//     </div>
//   );
// }

// export default App;
