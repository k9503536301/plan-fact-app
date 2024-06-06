import Papa from "papaparse";

const FetchData = ({ onChange }) => {
  const handleDownload = async e => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: results => {
        onChange(results.data);
      },
    });
  };

  return (
    <div style={{ float: "left", padding: "30px 30px 10px 40px" }}>
      <input type="file" accept=".csv" onChange={handleDownload} />
    </div>
  );
};

export default FetchData;
