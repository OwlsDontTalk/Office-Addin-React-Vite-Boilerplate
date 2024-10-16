import * as React from "react";
import Header from "./Header";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { insertText } from "../taskpane";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Header logo="../assets/logo-filled.png" title={props.title} message="Welcome to your Add-In Application" />
      <TextInsertion insertText={insertText} />
    </div>
  );
};

export default App;
