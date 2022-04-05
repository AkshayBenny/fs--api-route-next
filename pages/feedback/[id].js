import {
  buildFeedbackPath,
  extractFeedback,
} from '../../helpers/helperFunctions';

const FeedbackId = (props) => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      <p>{props.data.email}</p>
      <p>{props.data.feedback}</p>
    </div>
  );
};

export default FeedbackId;

export async function getStaticProps(context) {
  const id = context.params.id;
  const path = buildFeedbackPath();
  const feedbacks = extractFeedback(path);
  const feedback = feedbacks.find((feedback) => feedback.id === id);
  return {
    props: {
      data: feedback,
    },
  };
}

export async function getStaticPaths() {
  const path = buildFeedbackPath();
  const feedbacks = await extractFeedback(path);
  const idArray = [];
  feedbacks.map((item) => {
    idArray.push({ params: { id: item.id } });
  });

  return {
    paths: idArray,
    fallback: true,
  };
}
