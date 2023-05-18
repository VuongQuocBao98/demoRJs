import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Checkbox, Typography, FormControlLabel, Link, InputAdornment, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { phoneRegExp } from 'src/utils/validation';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import Icon from 'src/components/color-utils/Icon';
import { MapIcon } from 'src/assets/icons';
import { ISCollectionpoint } from 'src/@types/colectionPoint';
import { useAuthContext } from 'src/auth/useAuthContext';
import { dispatch } from 'src/redux/store';
import { addProfileColectionPoint } from 'src/redux/slices/ProfileCollectionPoint';
import Iconify from 'src/components/iconify';

type FormValuesProps = ISCollectionpoint;

type IProps = {
    isView?: boolean;
    isEdit?: boolean;
    currentProfileColectionPoint?: any;
};



const ProfileColectionAddNew = ({ isView = false, isEdit = false, currentProfileColectionPoint }: IProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { rolePage } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);


    const NewProfilecollectionSchema = Yup.object({
        fullName: Yup.string().required('FullName is required'),
        phone: Yup.string().required('Phone Number is required').min(8, 'phone number min 8.')
            .max(12, 'phone number max 12.')
            .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
        organizationPhone: Yup.string().required('Phone Number is required').min(8, 'phone number min 8.')
            .max(12, 'phone number max 12.')
            .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
        identifyCard: Yup.string().required('identify Card is required'),
        organizationAddress: Yup.string().required('address is required'),
        organizationEmail: Yup.string().required('email is required').email('Email is invalid!'),
        locationName: Yup.string().required('FullName is required'),
        email:Yup.string().required('email is required').email('Email is invalid!'),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    });


    const defaultValues = useMemo(
        () => ({
            locationName: currentProfileColectionPoint?.LocationName || '',
            fullName: currentProfileColectionPoint?.fullName || '',
            phone: currentProfileColectionPoint?.phone || '',
            organizationPhone: currentProfileColectionPoint?.organizationPhone || '',
            organizationAddress: currentProfileColectionPoint?.organizationAddress || '',
            organizationEmail: currentProfileColectionPoint?.organizationEmail || '',
            roleId: rolePage.diemthuhoso?._id,
            identifyCard: currentProfileColectionPoint?.identifyCard || '',
            email:currentProfileColectionPoint?.email || '',

        }),
        [isEdit, currentProfileColectionPoint]
    );

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewProfilecollectionSchema),
        defaultValues,
    });


    const {
        reset,
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors },
    } = methods;

    console.log("errors", errors);


    useEffect(() => {
        if (isEdit && currentProfileColectionPoint) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentProfileColectionPoint]);

    const onSubmit = async (data: FormValuesProps) => {
        console.log('ccc', data)

        console.log('point', rolePage.diemthuhoso?._id)

        try {
            if (isEdit) {
            } else {

                const dataConvert = { ...data, username: data.organizationEmail }
                const res = await dispatch(addProfileColectionPoint(dataConvert))
                console.log(res);

            }
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            // push(PATH_DASHBOARD.configuration.cluster);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                display: 'flex',

            }}>
                <Box sx={{ width: '70%', maxWidth: '712px' }}>
                    <Box
                        sx={{
                            display: 'flex',

                        }}
                    >
                        <Grid container >
                            <Grid item xs={12}>
                                <Card sx={{ p: 3 }}>
                                    <Box sx={{ pb: 3, fontFamily: 'Public Sans', fontSize: '16px', color: '#637381', fontWeight: 'bold' }}>
                                        ORGANIZATION INFORMATION
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            columnGap: 2,
                                            rowGap: 3,
                                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                        }}
                                    >
                                        <RHFTextField name="locationName" label="The organizer of the collection of records *" disabled={isView} />
                                        <RHFTextField name="organizationEmail" label="Email *" disabled={isView} />
                                        <RHFTextField name="organizationPhone" label="Phone number *" disabled={isView} />
                                        <RHFTextField name="organizationAddress" label="Adress *" disabled={isView} />
                                    </Box>


                                </Card>


                                <Card sx={{ marginTop: 2, p: 3 }}>
                                    <Box sx={{ pb: 3, fontFamily: 'Public Sans', fontSize: '16px', color: '#637381', fontWeight: 'bold' }}>
                                        AGENT INFORMATION
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            columnGap: 2,
                                            rowGap: 3,
                                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                        }}
                                    >
                                        <RHFTextField name="fullName" label="The organizer of the collection of records *" disabled={isView} />
                                        <RHFTextField name="identifyCard" label="citizen identification *" disabled={isView} />
                                        <RHFTextField name="phone" label="Phone number *" disabled={isView} />
                                        <RHFTextField name="email" label="Email *" disabled={isView} />
                                    </Box>
                                </Card>

                                <Card sx={{ marginTop: 2, p: 3 }}>

                                    <RHFTextField name="password" label="Password *" disabled={isView} sx={{ width: 'full' }}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }} />


                                </Card>

                                {!isView && (
                                    <Stack direction='row-reverse' sx={{ mt: 3 }}>
                                        <LoadingButton sx={{ bgcolor: '#173664' }} type="submit" variant="contained" loading={isSubmitting}>
                                            {!isEdit ? 'Save Changes' : ''}
                                        </LoadingButton>
                                        <Link component={RouterLink} to={PATH_DASHBOARD.profileColection.root}>
                                            <LoadingButton sx={{ color: '#173664', borderColor: '#173664', marginRight: 1 }} type="submit" variant="outlined"  >
                                                {!isEdit ? 'Cancel' : ''}
                                            </LoadingButton>
                                        </Link>

                                    </Stack>
                                )}


                            </Grid>
                        </Grid>

                    </Box >
                </Box>
                <Box sx={{ mx: 'auto' }}>
                    <MapIcon sx={{ width: '155px', height: '150px' }} />
                </Box>
            </Box>

        </FormProvider>
    );
};

export default ProfileColectionAddNew;
