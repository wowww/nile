import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useCallback, useState } from 'react';

export type MarkdownEditorProps = {
  // TODO
};

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [value, setValue] = useState()

  const handleChange = useCallback((type: any) => {
    console.log(type);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Editor
          onChange={handleChange}
          usageStatistics={false}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          initialEditType="wysiwyg"
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div([]);

const Wrapper = styled.div`
  & > * {
    margin: 8px;
  }
`;
