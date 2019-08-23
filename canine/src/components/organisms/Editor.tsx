import React from "react";
import { useContainer } from "unstated-next";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { EditorContext } from "~/contexts/EditorContext";
import { CompilerContext } from "~/contexts/CompilerContext";
import { CompilerList } from "~/hooks/compilerList";
import { ResultContext } from "~/contexts/ResultContext";
import { PermlinkData } from "~/hooks/permlink";
import { CodeEditor } from "./Editor/CodeEditor";
import { EditorSettings } from "./Editor/EditorSettings";
import { EditorTabs } from "./Editor/EditorTabs";

export interface EditorProps {
  compilerList: CompilerList;
  permlinkData: PermlinkData | null;
}

const Editor: React.FC<EditorProps> = (props): React.ReactElement => {
  const editor = useContainer(EditorContext);
  const compiler = useContainer(CompilerContext);
  const result = useContainer(ResultContext);
  const { compilerList, permlinkData } = props;
  const { settings } = editor;
  return (
    <Paper>
      <Grid container>
        <Grid item style={{ overflowX: "scroll", flex: 1 }}>
          <EditorTabs editor={editor} permlinkData={permlinkData} />
          <CodeEditor
            {...{ editor, compiler, compilerList, result, permlinkData }}
          />
        </Grid>
        {((): React.ReactElement => {
          if (settings.opened) {
            return (
              <Grid item style={{ width: 200 }}>
                <EditorSettings settings={settings} />
              </Grid>
            );
          } else {
            return (
              <Grid item style={{ width: "auto" }}>
                <EditorSettings settings={settings} />
              </Grid>
            );
          }
        })()}
      </Grid>
    </Paper>
  );
};

export { Editor };