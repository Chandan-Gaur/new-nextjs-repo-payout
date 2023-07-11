import "@/app/globals.css";

const loading = () => {
  return (
    <section className="loading_section">
      <div className="loading">
        <div className="lds-hourglass"></div>
      </div>
    </section>
  );
};

export default loading;
