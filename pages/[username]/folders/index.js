import Layout from "../../../components/Layout";
import Folders from "../../../components/folders";
import styles from "../../../styles/Folders.module.css";
import getFolders from "../../api/user/folders";

// all the folders page
const FoldersPage = ({ data }) => {
  const { folders } = styles;
  return (
    <Layout>
      <div className={folders}>
        <Folders data={data} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const folders = await getFolders(req, res);

  return {
    props: {
      data: folders,
    },
  };
};

export default FoldersPage;
