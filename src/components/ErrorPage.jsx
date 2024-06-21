const ErrorPage = ({ err }) => {
  if (err) {
    return (
      <section>
        <h2>Oops!</h2>
        <p className="err-msg">{err}</p>
      </section>
    );
  }
  return null;
};

export default ErrorPage;
