'use client';

const HeroNavArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='100'
      height='100'
      viewBox='0 0 48 48'
      className='animate-bounce w-10 h-20 duration-200 hover:fill-accent-blue cursor-pointer'
      onClick={(e) => {
        e.preventDefault();
        const elementToView = document.getElementById('upcoming-matches');
        console.log(elementToView);
        elementToView?.scrollIntoView();
      }}
    >
      <path d='M 23.976562 1.9785156 A 1.50015 1.50015 0 0 0 22.5 3.5 L 22.5 40.878906 L 18.060547 36.439453 A 1.50015 1.50015 0 1 0 15.939453 38.560547 L 22.939453 45.560547 A 1.50015 1.50015 0 0 0 25.060547 45.560547 L 32.060547 38.560547 A 1.50015 1.50015 0 1 0 29.939453 36.439453 L 25.5 40.878906 L 25.5 3.5 A 1.50015 1.50015 0 0 0 23.976562 1.9785156 z'></path>
    </svg>
  );
};

export default HeroNavArrow;
