import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12">
      <div>
        <Image src="/reader-logo.jpeg" width={150} height={150} alt='Logo' />
      </div>
      <div>
        Test
      </div>
    </div>
  );
}
