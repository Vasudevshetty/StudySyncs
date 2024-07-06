import { useEffect, useState } from "react";
import { storage, firestore } from "../../firebaseConfig"; // Check that this import correctly initializes Firebase
import { ref, listAll, getDownloadURL } from "firebase/storage";

function AppPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage, "sjce/cse/sem-4/22CS410/module-1");
        const listResult = await listAll(storageRef);

        const fileList = listResult.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            url,
          };
        });

        const fileData = await Promise.all(fileList);
        setFiles(fileData);
        console.log(fileData);
      } catch (error) {
        console.error("Error fetching files: ", error);
        // Handle error (e.g., set state for error message)
      }
    };

    fetchFiles();
  }, []);

  return (
    <section>
      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <a href={file.url} target="_blank" download>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AppPage;
