import styled from '@emotion/styled';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

export type MarkdownViewerProps = {
  value: string;
};

export const MarkdownViewer = ({ value }: MarkdownViewerProps) => {
  return (
    <Container>
      <Wrapper>
        <Viewer
          usageStatistics={false}
          initialValue={value}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
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
