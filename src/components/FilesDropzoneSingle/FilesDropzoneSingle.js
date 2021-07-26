import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';
import {makeStyles} from '@material-ui/styles';
import {colors, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    dropZone: {
        border: `1px dashed #f4f4f4`,
        padding: 8,
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: colors.grey[50],
            opacity: 0.5,
            cursor: 'pointer'
        }
    },
    dragActive: {
        backgroundColor: colors.grey[50],
        opacity: 0.5
    },
    image: {
        width: 100
    },
    info: {
        marginTop: 8
    },
    list: {
        maxHeight: 320
    },
    actions: {
        marginTop: 16,
        display: 'flex',
        justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: 16
        }
    }
}));

const FilesDropzoneSingle = props => {
    const {className, files, setFiles, ...rest} = props;

    const classes = useStyles();

    const handleDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(file => {
            console.log("")
            const reader = new FileReader();
            reader.onload = function (e) {
                setFiles({img: e.target.result});
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);

    const handleRemoveAll = () => {
        setFiles([]);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: handleDrop
    });

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div
                className={clsx({
                    [classes.dropZone]: true,
                    [classes.dragActive]: isDragActive
                })}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {
                    files.img === "" ? (
                        <>
                            <div>
                                <Typography
                                    gutterBottom
                                    variant="h3"
                                >
                                    รูปภาพ Preview
                                </Typography>
                                <Typography
                                    className={classes.info}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <span>ลากไฟล์มาวาง</span>
                                </Typography>
                            </div>
                        </>
                    ) : (<img src={files.img} width={100}/>)
                }
            </div>
        </div>
    );
};

FilesDropzoneSingle.propTypes = {
    className: PropTypes.string,
    files: PropTypes.any,
    setFiles: PropTypes.any,
};


export default FilesDropzoneSingle;
