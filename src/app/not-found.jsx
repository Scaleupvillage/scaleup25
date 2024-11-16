import "./globals.css";
import Image from "next/image";

export default function notfound() {
  return (
    <div className="not-found">
      <Image
        src="/404.gif"
        alt="404"
        width={1000}
        height={1000}
        className="not-found-img"
      />
    </div>
  )
}
