import React, {Fragment, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {v1} from 'uuid';
import {useDropzone} from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {Button, colors, Grid, ListItem, ListItemIcon, Typography} from '@material-ui/core';

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

const FilesDropzone = props => {
    const {className, files, setFiles, ...rest} = props;

    const classes = useStyles();

    // const handleDrop = useCallback(acceptedFiles => {
    //     setFiles(files => [...files].concat(acceptedFiles));
    // }, []);
    const handleDrop = useCallback(acceptedFiles => {
        acceptedFiles.map(file => {
            console.log("")
            const reader = new FileReader();
            reader.onload = function (e) {
                setFiles(files => [...files].concat(e.target.result));
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
                <div>
                    <img
                        alt={<span>Select file</span>}
                        className={classes.image}
                        src="/images/undraw_add_file2_gvbb.svg"
                        width={50}
                    />
                </div>
                <div>
                    <Typography
                        gutterBottom
                        variant="h3"
                    >
                        Select files
                    </Typography>
                    <Typography
                        className={classes.info}
                        color="textSecondary"
                        variant="body1"
                    >
                        <span>ลากไฟล์มาวาง</span>
                    </Typography>
                </div>
            </div>
            {files.length > 0 && (
                <Fragment>
                    <PerfectScrollbar options={{suppressScrollX: true}}>
                        <Grid container className={classes.list}>
                            {files.map((file, i) => (
                                <Grid xs={4} sm={4}>
                                    <ListItem
                                        divider={i < files.length - 1}
                                        key={v1()}
                                    >
                                        <ListItemIcon>
                                            <img src={file} alt="" width={"150"}/>
                                        </ListItemIcon>
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    </PerfectScrollbar>
                    <div className={classes.actions}>
                        <Button
                            onClick={handleRemoveAll}
                            size="small"
                        >
                            Remove all
                        </Button>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

FilesDropzone.propTypes = {
    className: PropTypes.string,
    files: PropTypes.any,
    setFiles: PropTypes.any,
};


export default FilesDropzone;
