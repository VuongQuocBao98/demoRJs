import { memo } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

function IconFileAttached({ ...other }: BoxProps) {
    return (
        <Box {...other}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_501_34646)">
                    <path d="M16.5 6.75V17.33C16.5 19.42 14.97 21.28 12.89 21.48C10.5 21.71 8.5 19.84 8.5 17.5V5.14C8.5 3.83 9.44 2.64 10.74 2.51C12.24 2.36 13.5 3.53 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6.75C11.5 6.34 11.16 6 10.75 6C10.34 6 10 6.34 10 6.75V15.36C10 16.67 10.94 17.86 12.24 17.99C13.74 18.14 15 16.97 15 15.5V5.17C15 3.08 13.47 1.22 11.39 1.02C9.01 0.790001 7 2.66 7 5V17.27C7 20.14 9.1 22.71 11.96 22.98C15.25 23.28 18 20.72 18 17.5V6.75C18 6.34 17.66 6 17.25 6C16.84 6 16.5 6.34 16.5 6.75Z" fill="#637381" />
                </g>
                <defs>
                    <clipPath id="clip0_501_34646">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Box>
    );
}

export default memo(IconFileAttached);