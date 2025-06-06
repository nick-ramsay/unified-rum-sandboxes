import Image from "next/image";
import MongoImage from "../images/mongo_logo.png";
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="grid items-center justify-items-center p-10">
      <div className="row align-center justify-content-center mb-10">
        <h1 className="">Next.js Mongo Template</h1>
      </div>
      <div className="flex flex-row gap-10 items-center">
        <div className="basis-1/2 inline-block align-middle">
          <Image src="./next.svg" alt="Next.js logo" className="dark:invert" width={190} height={38} />
        </div>
        <div className="basis-1/2">
          <Image src={MongoImage} alt="MongoDB logo" width={190} height={38} />
        </div>
      </div>
    </div>

  )
}
