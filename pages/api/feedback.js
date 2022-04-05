// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import {
  buildFeedbackPath,
  extractFeedback,
} from '../../helpers/helperFunctions';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const fullName = req.body.name;
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedBack = {
      id: fullName,
      name: fullName,
      email: email,
      feedback: feedback,
    };
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedBack);

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success', feedback: newFeedBack });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(201).json({ feedback: data });
  }
}
