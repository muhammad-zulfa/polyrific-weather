import Link from "next/link";
export default function Footer(){
  return (
    <footer className="footer">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link"> Home </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/about-me">
            <a className="nav-link"> About Me </a>
          </Link>
        </li>
      </ul>
    </footer>
  )
}
