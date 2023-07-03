'use client';

import { useRouter } from 'next/navigation';

const CloseModal = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.refresh();
        router.back();
      }}
      className='absolute top-0 right-0 z-[150] text-primary mr-3 cursor-pointer'
    >
      X
    </div>
  );
};

export default CloseModal;
