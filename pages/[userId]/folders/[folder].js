import Layout from "../../../components/Layout";
import Files from "../../../components/files";

// single folder page containing all the files
const FolderPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(30, auto)",
          marginTop: "50px",
        }}
      >
        <Files />
      </div>
    </Layout>
  );
};

export default FolderPage;
