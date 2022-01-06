import Layout from "../../../components/Layout";
import Files from "../../../components/files";
import { getFiles } from "../../api/user/folders/[folder]";

// single folder page containing all the files
const FolderPage = ({ data }) => {
  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(30, auto)",
          marginTop: "50px",
        }}
      >
        <Files data={data} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const files = await getFiles(req, res);

  return {
    props: {
      data: files,
    },
  };
};

export default FolderPage;
