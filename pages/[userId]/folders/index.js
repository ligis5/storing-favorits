import Layout from "../../../components/Layout";
import Folders from "../../../components/folders";
import styles from "../../../styles/Folders.module.css";
import { url } from "../../../url";

export async function getServerSideProps(context) {
  const res = await fetch(`${url}/api/${context.query.userId}/folders`);
  const foldersData = await res.json();
  return {
    props: { foldersData },
  };
}
// all the folders page
const FoldersPage = ({ foldersData }) => {
  const { folders } = styles;
  return (
    <Layout>
      <div className={folders}>
        <Folders foldersData={foldersData} />
      </div>
    </Layout>
  );
};
export default FoldersPage;
