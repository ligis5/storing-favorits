import Layout from "../../../components/Layout";
import Folders from "../../../components/folders";
import styles from "../../../styles/Folders.module.css";

const FoldersPage = () => {
  const { folders } = styles;
  return (
    <Layout>
      <div className={folders}>
        <Folders />
      </div>
    </Layout>
  );
};
export default FoldersPage;
