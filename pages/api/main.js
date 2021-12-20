// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { getFirestore, collection, getDoc } = require("firebase/firestore");

const db = getFirestore();

const doc = db.collection("users");

const observer = doc.onSnapshot(
  (docSnapshot) => {
    console.log(`Received doc snapshot: ${docSnapshot}`);
    // ...
  },
  (err) => {
    console.log(`Encountered error: ${err}`);
  }
);

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
console.log("hi");
