import 'src/utils/highlight';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';

import { CKEditor } from 'ckeditor4-react';

// ----------------------------------------------------------------------

const config = {
  editorplaceholder: 'Start typing here...',

  extraPlugins: 'image2,uploadimage',

  // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
  // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
  // filebrowserUploadUrl:
  //   '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
  // filebrowserImageUploadUrl:
  //   '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',

  // // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
  // uploadUrl:
  //   '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
  // removeDialogTabs: 'image:advanced;link:advanced',
};

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  disabled = false,
  sx,
  ...other
}: EditorProps) {
  const onEditorChange = (evt: any) => {
    const value = evt.editor.getData();
    onChange(value);
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <CKEditor
          debug={true}
          editorUrl="https://cdn.ckeditor.com/4.21.0/full-all/ckeditor.js"
          readOnly={disabled}
          config={config}
          onChange={onEditorChange}
          value={value}
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
