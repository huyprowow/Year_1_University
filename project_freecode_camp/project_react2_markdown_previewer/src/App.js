import { render } from "@testing-library/react";
import React from "react";
import "./dist/App.css";
import marked from "marked";
// import Prism from "./prism";

// https://c4.wallpaperflare.com/wallpaper/187/674/531/anime-dual-monitor-multi-wallpaper-preview.jpg
const paragraph = `# cơm tró nè 😆😆😆
![Anime Wallpape](https://wallpaper.dog/large/17102938.png)
## :))

inline code: \`<div></div>\`

block code
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

chữ đậm: **đậm**
chữ nghiêng: _nghiêng_.
cả đậm, nghiêng: **_cả 2!_**
~~gạch ngang~~.

my facebook [Huy Bui](https://www.facebook.com/profile.php?id=100012670278483), and
> Khối Quotes!

bảng:

Header     |Header     | Header
-----------|-----------| -------------
nội dung.. |nội dung...| ...
...........|...........| ...

- danh sách
  -ds con
    - ds cháu
        - ds...


1. ds có tt
1. .....
1. ......
`;
// marked.setOptions({
//   breaks: true,
//   highlight: function (code) {
//     return Prism.highlight(code, Prism.languages.javascript, "javascript");
//   },
// });

const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: paragraph,
      editorExpand: false,
      previewExpand: false,
    };
  }
  onChangeHandle = (e) => {
    this.setState({ markdown: e.target.value });
  };
  editorExpandHandle = () => {
    this.setState({ editorExpand: !this.state.editorExpand });
  };
  previewExpandHandle = () => {
    this.setState({ previewExpand: !this.state.previewExpand });
  };

  render() {
    let idName = ["editorSmall", "previewSmall", "fas fa-expand"]; //mac dinh
    if (this.state.editorExpand) {
      idName = ["editorBig", "hide", "fas fa-compress"]; //to len, an thang con lai
    }
    if (this.state.previewExpand) {
      idName = ["hide", "previewBig", "fas fa-compress"];
    }
    return (
      <div id="contain">
        <div id={idName[0]}>
          <ToolBar
            text="Editor"
            icon={idName[2]}
            onClick={this.editorExpandHandle}
          />
          <Editor
            markdown={this.state.markdown}
            onChangeHandle={this.onChangeHandle}
          />
        </div>

        <div id={idName[1]}>
          <ToolBar
            text="Preview"
            icon={idName[2]}
            onClick={this.previewExpandHandle}
          />
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}
const ToolBar = (props) => {
  return (
    <div id="tool-bar">
      <span>{props.text}</span>
      <i className={props.icon} onClick={props.onClick}></i>
    </div>
  );
};

const Editor = (props) => {
  // console.log(props)
  return (
    <textarea
      id="editor"
      value={props.markdown}
      onChange={props.onChangeHandle}
    ></textarea>
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

export default App;
