export default function Footer() {
    return (
        <>
            <footer>
                <a
                    // href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    // target="_blank"
                    // rel="noopener noreferrer"
                >
                    {/* Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className="logo" /> */}
                    this is footer
                </a>
            </footer>

        <style jsx>{`


        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(21,178,229);
        }

        footer img {
          margin-left: 0.5rem;
          width : 100px;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

   
      `}</style>


        </>
    )
}