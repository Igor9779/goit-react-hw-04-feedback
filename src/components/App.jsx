import React, { useState } from "react";
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistic } from "./Statistics/Statistics";
import { Notification } from "./Notification/Notification";

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const updateStateCount = (state) => {
    setFeedback((prev) => ({
      ...prev,
      [state]: prev[state] + 1,
    }));
  };

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((acc, value) => acc + value, 0);

  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback()
      ? ((feedback.good / countTotalFeedback()) * 100).toFixed(0)
      : '0';
  };

  const { good, neutral, bad } = feedback;

  return (
    <>
      <Section title='Please leave feedback'>
        <FeedbackOptions
          options={feedback}
          onLeaveFeedback={updateStateCount}
        />
      </Section>

      {countTotalFeedback() ? (
        <Section title='Statistics'>
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
}
