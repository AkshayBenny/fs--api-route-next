import { useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const emailRef = useRef();
  const fullNameRef = useRef();
  const feedbackRef = useRef();
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState();
  const [hide, setHide] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const fullName = fullNameRef.current.value;
    const feedback = feedbackRef.current.value;

    const reqBody = {
      name: fullName,
      email: email,
      feedback: feedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const fetchHandler = () => {
    setIsLoading(true);
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback));
    setIsLoading(false);
  };

  const fetchMyFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedFeedback(data.feedback));
  };

  return (
    <div>
      <form
        className='flex flex-col border rounded p-12 border-gray-700  justify-center items-center space-y-4'
        onSubmit={formSubmitHandler}
      >
        <h1 className='text-2xl font-semibold text-gray-700'>
          Add new feedback
        </h1>
        <div className=' w-full'>
          <input
            type='text'
            id='name'
            ref={fullNameRef}
            placeholder='Full name'
            className='border rounded border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className=' w-full'>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='Email'
            className='border rounded border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='flex flex-col w-full'>
          <label htmlFor='feedback' className='font-light text-gray-800 '>
            Write your feedback
          </label>
          <textarea
            type='text'
            id='feedback'
            ref={feedbackRef}
            className='border rounded border-gray-500 w-full'
          />
        </div>

        <button className='w-full bg-gray-800 text-white rounded cursor-pointer p-4'>
          Submit
        </button>
      </form>
      <div className='flex justify-center'>
        <button
          onClick={() => {
            fetchHandler();
            setHide(!hide);
          }}
          className='bg-gray-800 mt-12 mb-12 text-white rounded px-6 py-4'
        >
          {!hide ? 'Show' : 'Hide'} Data
        </button>
      </div>

      <div className='grid grid-cols-3 gap-6 px-12'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          hide &&
          feedback.map((item, index) => {
            return (
              <div
                key={index}
                className='p-4 border-2 rounded bg-gray-200 space-y-4'
              >
                <p>Name: {item.name}</p>
                <p>Email: {item.email}</p>
                <button
                  className='bg-gray-600 px-4 py-2 rounded text-white'
                  onClick={fetchMyFeedbackHandler.bind(null, item.id)}
                >
                  Show feedback
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className='flex flex-col justify-center items-center'>
        {hide && selectedFeedback && (
          <div className='text-xl bold border rounded p-12'>
            <p>Email: {selectedFeedback.email}</p>
            <p>Name: {selectedFeedback.name}</p>
            <p>Feedback: {selectedFeedback.feedback}</p>
          </div>
        )}
      </div>
      <div>
        <Link href='/feedback' passHref>
          <button className='w-full bg-slate-500 py-4 text-white font-semibold'>
            Show all feedbacks
          </button>
        </Link>
      </div>
    </div>
  );
}
