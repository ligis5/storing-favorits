import Layout from "../../../components/Layout";
import Files from "../../../components/files";
import { url } from "../../../url";

export async function getServerSideProps(context) {
  const resFiles = await fetch(
    `${url}/api/${context.query.userId}/folders/${context.query.folder}`
  );
  const filesData = await resFiles.json();
  return {
    props: { filesData },
  };
}

// single folder page containing all the files
const FolderPage = ({ filesData }) => {
  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(30, auto)",
          marginTop: "50px",
        }}
      >
        <Files filesData={filesData} />
      </div>
    </Layout>
  );
};

export default FolderPage;
