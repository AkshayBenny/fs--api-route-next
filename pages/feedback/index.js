import {
  buildFeedbackPath,
  extractFeedback,
} from '../../helpers/helperFunctions';
import Link from 'next/link';

const feedback = (props) => {
  const { data } = props;

  if (data.length === 0) {
    return <p>Loading</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <p>{item.email}</p>
            <p>{item.feedback}</p>
            <Link href={`/feedback/${item.id}`} passHref>
              <button className='bg-green-400 text-black'>Know more</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default feedback; 

export async function getStaticProps() {
  const path = buildFeedbackPath();
  const data = extractFeedback(path);
  return {
    props: {
      data: data,
    },
  };
}
