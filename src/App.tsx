import React from "react";
import * as ReactDOM from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import VolumeUpSharpIcon from "@material-ui/icons/VolumeUpSharp";
import PauseIcon from "@material-ui/icons/Pause";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import ForumIcon from "@material-ui/icons/Forum";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import "./App.css";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { grey, blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

import category from "./categories.json";
import phrases from "./phrases.json";
import { Phrase } from "./types/phrases";

const drawerWidth = 280;

const themeColor = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootMain: {
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPhrase: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    footerBar: {
      top: "auto",
      bottom: "0px",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    subDrawerCloseIcon: {
      display: "flex",
      justifyContent: "flex-start",
      float: "left",
      marginLeft: "3px",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        padding: "12px 12px 84px",
      },
    },
    cardAudio: {},
    cardHolder: {
      padding: "5%",
      backgroundColor: grey[200],
    },
    cardRoot: {
      minWidth: 240,
      marginBottom: "24px",
    },
    cardRootLeft: {
      minWidth: 220,
      marginBottom: "24px",
      marginRight: "15%",
    },
    cardRootRight: {
      minWidth: 220,
      marginBottom: "24px",
      marginLeft: "15%",
    },
    cardContent: {
      position: "relative",
      padding: "5% 10%",
    },
    cardIcon: {
      position: "absolute",
      right: "3px",
      bottom: "3px",
      [theme.breakpoints.down("sm")]: {
        padding: "6px",
        right: 0,
        bottom: 0,
      },
    },
    footerRoot: {
      flexGrow: 1,
    },
  })
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function App(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(phrases);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [subDrawerOpen, setSubDrawerOpen] = React.useState(false);

  const handleSubDrawerToggle = () => {
    setSubDrawerOpen(true);
  };

  const onLoadAction = () => {
    let audio = new Audio();
    audio.id = "cardAudio";
  };

  const onClickVoice = (e: React.MouseEvent<HTMLElement>) => {
    let audio = e.currentTarget.getElementsByClassName(classes.cardAudio)[0];
    const playIcon = <VolumeUpSharpIcon fontSize="small" color="disabled" />;
    const puaseIcon = <PauseIcon fontSize="small" color="disabled" />;

    if (!(audio instanceof HTMLMediaElement)) {
      throw new Error("#audio is not an HTMLMediaElement");
    }

    audio.volume = 0.2;

    if (!audio.paused) {
      ReactDOM.render(
        playIcon,
        e.currentTarget.getElementsByClassName(classes.cardIcon)[0]
      );
      audio.pause();
    } else {
      ReactDOM.render(
        puaseIcon,
        e.currentTarget.getElementsByClassName(classes.cardIcon)[0]
      );
      audio.play();
    }

    audio.addEventListener("ended", (e) => {
      let audio = e.currentTarget as HTMLElement;
      let card = audio.parentNode as HTMLElement;
      ReactDOM.render(
        playIcon,
        card.getElementsByClassName(classes.cardIcon)[0]
      );
    });
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Toolbar
          component="div"
          style={{ display: "block", textAlign: "center", padding: "5px 0" }}
        >
          <Typography variant="h6">???????????????</Typography>
          <Typography variant="caption">??????????????????</Typography>
        </Toolbar>
      </div>

      <Divider />
      <List>
        {category.category_list.map((text, index) => (
          <ListItem button key={text} divider onClick={handleSubDrawerToggle}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={subDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Toolbar
            component="div"
            style={{ display: "block", textAlign: "center", padding: "5px 0" }}
          >
            <IconButton
              className={classes.subDrawerCloseIcon}
              onClick={() => {
                setSubDrawerOpen(false);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <div style={{ width: `calc(100% - 48px)` }}>
              <Typography variant="h6">????????????</Typography>
              <Typography variant="caption">??????????????????</Typography>
            </div>
          </Toolbar>
        </div>
        <Divider />
        <List>
          {phrases.map((phrase, index) => (
            <ListItem
              button
              key={phrase.title.jp}
              divider
              onClick={handleSubDrawerToggle}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={phrase.title.jp} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={themeColor}>
      <Container maxWidth="md" className={classes.rootMain}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                ????????????????????????
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="category folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={"left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Card
              className={classes.cardHolder}
              variant="outlined"
              onLoad={onLoadAction}
            >
              <Card className={classes.cardRoot}>
                <CardActionArea onClick={onClickVoice} data-url="./audio/1.mp3">
                  <audio
                    className={classes.cardAudio}
                    src="./audio/1.mp3"
                  ></audio>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="p">
                      ?????????????????????
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      I have a bad feeling about this.
                    </Typography>
                    <IconButton id="isVoicePlay" className={classes.cardIcon}>
                      <VolumeUpSharpIcon fontSize="small" color="disabled" />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Divider variant="middle" style={{ marginBottom: "24px" }} />
              <Card className={classes.cardRootLeft}>
                <audio id="cardAudio" src="./audio/2.mp3"></audio>
                <CardActionArea onClick={onClickVoice} data-url="./audio/2.mp3">
                  <audio
                    className={classes.cardAudio}
                    src="./audio/2.mp3"
                  ></audio>

                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="p">
                      ????????????????????????????????????????????????????????????
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Hey what's wrong? You look so worried.
                    </Typography>
                    <IconButton className={classes.cardIcon}>
                      <VolumeUpSharpIcon fontSize="small" color="disabled" />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card className={classes.cardRootRight}>
                <CardActionArea onClick={onClickVoice} data-url="./audio/3.mp3">
                  <audio
                    className={classes.cardAudio}
                    src="./audio/3.mp3"
                  ></audio>

                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="p">
                      ???????????????????????????????????????????????????
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      i don't know, I just have a bad feeling about this.
                    </Typography>
                    <IconButton className={classes.cardIcon}>
                      <VolumeUpSharpIcon fontSize="small" color="disabled" />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Divider variant="middle" style={{ marginBottom: "24px" }} />

              <Typography variant={"body1"} component="p">
                ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              </Typography>
            </Card>
          </main>
          <AppBar position="fixed" className={classes.footerBar}>
            <Paper square className={classes.footerRoot}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon label tabs example"
              >
                <Tab icon={<ForumIcon />} label="????????????" {...a11yProps(0)} />
                <Tab icon={<MenuBookIcon />} label="??????" {...a11yProps(1)} />
                <Tab icon={<LiveHelpIcon />} label="??????" {...a11yProps(2)} />
                <Tab icon={<SearchIcon />} label="??????" {...a11yProps(3)} />
              </Tabs>
            </Paper>
          </AppBar>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
