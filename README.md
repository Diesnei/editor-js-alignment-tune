
# Editor JS Alignment Tune

A simple but very customizable text alignment block tune for Editor Js package. Uses official package icons (https://github.com/codex-team/icons) for better UI and UX compatibility.


## Features

- Default alignment for all blocks
- Default alignment for specific blocks
- Available aligments for specific blocks
- You can combine all features above :)


## Installation

Using npm

```bash
  npm i editor-js-alignment-tune
```

Using Yarn
    
```bash
  yarn add editor-js-alignment-tune
```


## Configuration


| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| default | `string` | "left, "center", "right" or "justify". If not set, it will be "left".|
| blocks | `object` | Blocks settings. |
| blocks.default | `string` | Default alignment for the desired block, same rule as "default" property. |
| blocks.availableAlignments | `string` | Custom available alignments for the desired block. If not set, all alignments will be available.|

## Usage/Examples

Default use, no customization:

- In this case, all blocks using the tune will be left aligned by default.

```javascript
import EditorJS from '@editorjs/editorjs';
import AlignmentTune from 'editor-js-alignment-tune';

new EditorJS({
  tools: {
      paragraph: {
          class: Paragraph,
          tunes: ['alignmentTune']
      },
      alignmentTune: {
          class: AlignmentTune
      },
  }
});
```

Custom default alignment for all blocks:

- In this case, all blocks using the tune will be centered by default.

```javascript
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import AlignmentTune from 'editor-js-alignment-tune';

new EditorJS({
  tools: {
      paragraph: {
          class: Paragraph,
          tunes: ['alignmentTune']
      },
      header: {
          class: Header,
          tunes: ['alignmentTune']
      },
      alignmentTune: {
          class: AlignmentTune,
          config: {
              default: 'center'
          }
      },
  }
});
```

Custom available alignments for specific blocks:

- In this case, "paragraph" block will be centered, while "header" block will be left aligned. Also, "header" will have only "left", "center" and "right" alignments, while paragraph will have all of them plus "justify".

```javascript
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import AlignmentTune from 'editor-js-alignment-tune';

new EditorJS({
  tools: {
      paragraph: {
          class: Paragraph,
          tunes: ['alignmentTune']
      },
      header: {
          class: Header,
          tunes: ['alignmentTune']
      },
      alignmentTune: {
          class: AlignmentTune,
          config: {
              default: 'center', // All blocks not specified below will have this alignment
              blocks: {
                  header: {
                      default: left,
                      availableAlignments: ['left', 'center', 'right']
                  },
              }
          }
      },
  }
});
```

Useful tip: Editor JS tunes can have any name you want, just be sure that the "class" property is correct and the same name you set is used on "tunes" array of each block. E.g:

```javascript
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import AlignmentTune from 'editor-js-alignment-tune';

new EditorJS({
  tools: {
      paragraph: {
          class: Paragraph,
          tunes: ['customAlignmentName']
      },
      header: {
          class: Header,
          tunes: ['customAlignmentName']
      },
      customAlignmentName: {
          class: AlignmentTune,
          config: {
              default: 'center',
              blocks: {
                  header: {
                      default: left
                  },
              }
          }
      },
  }
});
```


## Feedback

If it helped you someway, please give it a star <3.

