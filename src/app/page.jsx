import Image from 'next/image';
import hbg from '../../public/Haircut_welcome.png';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="">
      <Image src={hbg} alt="" className='bgimg' />
      <div className="overlay">
        <h1 className='text-6xl'>Its time to book your next haircut</h1>
        <Link href='/registration'>
          <button className='bg-slate-50 text-black text-lg px-12 py-2 mt-96 ml-72 rounded-lg transition ease-in-out delay-80 hover:text-white  hover:-translate-y-1 hover:scale-110 hover:bg-yellow-700 duration-300'>Book an Appointment</button>
        </Link>
      </div>
    </div>
  );
}
