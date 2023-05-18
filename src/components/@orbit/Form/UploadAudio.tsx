import { useDropzone } from 'react-dropzone';
// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
import { RejectionFiles, UploadProps } from 'src/components/upload';
// components
import { fileData, fileThumb } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export default function UploadAudio({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { getInputProps, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const { name = '' } = fileData(file as any);

  return (
    <Stack sx={{ width: 1, position: 'relative', ...sx }}>
      <Stack direction="row" justifyContent="space-between">
        {hasFile ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ borderRadius: 50, background: 'rgba(145, 158, 171, 0.08);', px: 1, py: '6px' }}
            >
              <Box
                component="img"
                src={fileThumb('audio')}
                sx={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  ...sx,
                }}
              />
              <Typography
                sx={{ pl: 1, fontSize: 13, fontWeight: 700, color: 'text.secondary' }}
                noWrap
              >
                {name}
              </Typography>
            </Stack>
          </>
        ) : null}

        <Button variant="contained" component="label">
          Upload File
          <input {...getInputProps()} />
        </Button>
      </Stack>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </Stack>
  );
}
