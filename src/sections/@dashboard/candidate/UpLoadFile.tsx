import { useEffect, useState, useCallback } from 'react';
// @mui
import {
    Stack,
    Dialog,
    Button,
    TextField,
    DialogProps,
    DialogTitle,
    DialogContent,
    DialogActions,
    Autocomplete,
} from '@mui/material';
// components
import Upload from 'src/components/upload/Upload'

// ----------------------------------------------------------------------

interface Props extends DialogProps {
    title?: string;
    //
    onCreate?: VoidFunction;
    onUpdate?: VoidFunction;
    //
    folderName?: string;
    onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    //
    open: boolean;
    onClose: VoidFunction;
}

export default function FileNewFolderDialog({
    title = 'Import Candidate',
    open,
    onClose,
    //
    onCreate,
    onUpdate,
    //
    folderName,
    onChangeFolderName,
    ...other
}: Props) {
    const [files, setFiles] = useState<(File | string)[]>([]);

    useEffect(() => {
        if (!open) {
            setFiles([]);
        }
    }, [open]);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setFiles([...files, ...newFiles]);
        },
        [files]
    );

    const handleUpload = () => {
        onClose();
        console.log('ON UPLOAD');
    };

    const handleCancel = () => {
        onClose();
    }

    const handleRemoveFile = (inputFile: File | string) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
            <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

            <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
                {(onCreate || onUpdate) && (
                    <TextField
                        fullWidth
                        label="Folder name"
                        value={folderName}
                        onChange={onChangeFolderName}
                        sx={{ mb: 3 }}
                    />
                )}

                <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
            </DialogContent>
            <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
            <Autocomplete
                      fullWidth
                      options={location}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField  {...params} label="application collection point" margin="none" />
                      )}
                    />

                
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"

                  onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"

                    onClick={handleUpload}
                >
                    Create
                </Button>


                {!!files.length && (
                    <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
                        Remove all
                    </Button>
                )}

                {(onCreate || onUpdate) && (
                    <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                        <Button variant="soft" onClick={onCreate || onUpdate}>
                            {onUpdate ? 'Save' : 'Create'}
                        </Button>
                    </Stack>
                )}
            </DialogActions>
        </Dialog>
    );
}

export const location = [{ title: 'Hanoi' }, { title: 'HCM' }];