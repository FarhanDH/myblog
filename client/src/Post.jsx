export function Post() {
  return (
    <>
      <div className="post">
        <div className="image">
          <img
            src="https://i.pinimg.com/736x/59/9e/53/599e53032084b72fa762270a8f2649c7.jpg"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>Funny Monkey</h2>
          <p className="info">
            <a className="author">John Doe</a>
            <time>2022-10-10</time>
          </p>
          <p className="summary">
            California - Seekor monyet di Sulawesi, Indonesia yang sempat
            menjadi pemberitaan karena foto selfie-nya sambil tersenyum,
            dinobatkan sebagai 'Person of the Year' oleh kelompok internasional
            pejuang hak binatang PETA.
          </p>
        </div>
      </div>
    </>
  );
}
