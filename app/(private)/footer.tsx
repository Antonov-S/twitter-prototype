import Link from "next/link";

export default function Footer() {
  const currentDate = new Date();
  return (
    <footer className="w-full flex justify-between items-center mt-3">
      <small>
        <p>
          Strings © {currentDate.getFullYear()} Copyright by{" "}
          <Link
            className=""
            href="https://s-antonov-portfolio-website.vercel.app/"
            target="_blank"
          >
            <b className="opacity-50">S.Antonov</b>
          </Link>
          . Intended for learning purposes.
        </p>
      </small>
    </footer>
  );
}
