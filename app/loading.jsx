'use client';
import RingLoader from "react-spinners/RingLoader";
import { useAppSelector } from '../redux/hooks';

const Loading = () => {
  const isLoading = useAppSelector(state => state.isLoading.value);

  return (
    <>
      {isLoading &&
        <div className='loader'>
          <RingLoader
            color='#573b8a'
            size={150}
          />
        </div>
      }
    </>
  )
}

export default Loading