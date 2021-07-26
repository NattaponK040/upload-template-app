import './App.css';
import {
    AppBar,
    Button,
    Card,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar, Typography
} from "@material-ui/core";

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FilesDropzone from "./components/FilesDropzone";
import FilesDropzoneSingle from "./components/FilesDropzoneSingle";
import {createFolder, createTemplate, getCode, getIdImagePreview, getPublicLink, insertPort} from "./service";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";

const uuid = require("uuid");
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const themeCode = {
    "M001":"Edu",
    "M002":"Manage",
    "M003":"Phi",
    "M004":"Sci",
    "M007":"Art",
    "M008":"Social",
    "M009":"Fly",
    "M010":"ComArt",
    "M011":"Food",
    "M012":"EN",
    "M013":"Sport",
    "M014":"Law",
    "M015":"Teach",
    "M016":"Doc",
    "M017":"Logis",
    "M018":"IT",
    "M020":"Other",
}


function App() {
    const classes = useStyles();
    const [tempCode, setTempCode] = useState("")
    const [googleDriveLink, setGoogleDriveLink] = useState("")
    const [theme, setTheme] = React.useState('M009');
    const [color, setColor] = React.useState('None');
    const [filePreview, setFilePreview] = useState({img: ""});
    const [files, setFiles] = useState([]);
    const [open,setOpen] =useState(false);
    const handleOpen =()=>{
        setOpen(true);
    }
    const handleClose =()=>{
        setOpen(false);
    }

    const init = async()=>{
        await getCode()
    }
    init()
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Upload Portfolio Template
                    </Typography>
                    <Link to="/">
                        <button type="button"  color="inherit" >
                            Upload
                        </button>
                    </Link>
                    <Link to="/view/all">
                        <button type="button"  color="inherit">
                            View Template
                        </button>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className="center-screen">
            <Card className={"container"}>
                <FilesDropzoneSingle files={filePreview} setFiles={setFilePreview}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">คณะ</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={theme}
                        onChange={async (event) => {
                            setTheme(event.target.value);
                            setTempCode(themeCode[event.target.value]+"-"+ (await getCode()+ Math.floor(Math.random() * 1000)))
                        }}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"M020"}> ไม่เจาะจงสายคณะ/สาขา</MenuItem>
                        <MenuItem value={"M001"}> สายทางการศึกษา</MenuItem>
                        <MenuItem value={'M002'}> สายบริหาร</MenuItem>
                        <MenuItem value={'M003'}> สายภาษาศาสตร์</MenuItem>
                        <MenuItem value={'M004'}> สายวิทยาศาสตร์</MenuItem>
                        <MenuItem value={`M007`}> สายศิลปะ</MenuItem>
                        <MenuItem value={`M008`}> สายสังคม</MenuItem>
                        <MenuItem value={`M009`}> การบิน</MenuItem>
                        <MenuItem value={`M010`}> นิเทศศาสตร์</MenuItem>
                        <MenuItem value={`M011`}> อาหาร</MenuItem>
                        <MenuItem value={`M012`}> วิศวกร</MenuItem>
                        <MenuItem value={`M013`}> กีฬา</MenuItem>
                        <MenuItem value={`M014`}> กฎหมาย</MenuItem>
                        <MenuItem value={`M015`}> แพทย์/พยาบาล</MenuItem>
                        <MenuItem value={`M016`}> ครูู</MenuItem>
                        <MenuItem value={`M017`}> ลอจิสติก</MenuItem>
                        <MenuItem value={`M018`}> สารสนเทศ</MenuItem>
                    </Select>
                </FormControl>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label={<span>รหัสเทมเพต</span>} variant="outlined"
                               value={tempCode} onChange={e => setTempCode(e.target.value)}/>
                </form>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">สี</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={color}
                        onChange={(event) => {
                            setColor(event.target.value);
                        }}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"C001"}>สีชมพู</MenuItem>
                        <MenuItem value={"C002"}>สีดำ</MenuItem>
                        <MenuItem value={"C003"}>สีน้ำตาล</MenuItem>
                        <MenuItem value={"C004"}>สีน้ำเงิน</MenuItem>
                        <MenuItem value={"C005"}>สีพาสเทล</MenuItem>
                        <MenuItem value={"C006"}>สีฟ้า</MenuItem>
                        <MenuItem value={"C007"}>สีม่วง</MenuItem>
                        <MenuItem value={"C008"}>สีส้ม</MenuItem>
                        <MenuItem value={"C009"}>สีเขียว</MenuItem>
                        <MenuItem value={"C010"}>สีเทา</MenuItem>
                        <MenuItem value={"C011"}>สีเหลือง</MenuItem>
                        <MenuItem value={"C012"}>สีแดง</MenuItem>
                    </Select>
                </FormControl>
                <FilesDropzone files={files} setFiles={setFiles}/>

                <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    onClick={async () => {
                        handleClose()
                        const folderId = await createFolder(tempCode);
                        const driveLink = await getPublicLink(folderId)
                        const getValue = () => files.map(async value => {
                            // await createTemplate(value,folderId)
                            const oriLink = getOriginalLink(value);
                            // createTemplate(uuid.v1() + ".png", oriLink, folderId);
                            const data = await getIdImagePreview(oriLink)
                            return getLinkStore(data)
                        })

                        const request = {
                            templateCode: tempCode,
                            colorCode: color,
                            majorCode: theme,
                            preview: getLinkStore( getIdImagePreview(getOriginalLink(filePreview.img))),
                            templateSet: await Promise.all(getValue()),
                            googleDrive: driveLink
                        }
                        insertPort(request)
                        setGoogleDriveLink(driveLink)
                        handleOpen()
                    }}
                >Upload files</Button>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {googleDriveLink}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>

    );
}

function getOriginalLink(link) {
    return link.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")
}

function getLinkStore(data) {
    const {bucket, id, name, token} = data;
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${name}?alt=media&token=${token}`
}

export default App;
