import {
  buildFeedbackPath,
  extractFeedback,
} from '../../helpers/helperFunctions';

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const myFeedbackData = data.find((feedback) => feedback.id === feedbackId);
  res.status(200).json({ feedback: myFeedbackData });
}
