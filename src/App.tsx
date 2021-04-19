import React from "react";
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
    },
    cardHolder: {
      padding: "5%",
      backgroundColor: grey[200],
    },
    cardRoot: {
      minWidth: 240,
      marginBottom: "24px",
    },
    cardRootLeft: {
      minWidth: 240,
      marginBottom: "24px",
      marginRight: "15%",
    },
    cardRootRight: {
      minWidth: 240,
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
  const categories = [
    "あいさつ",
    "初対面",
    "食べる時",
    "カジュアル",
    "車内",
    "買い物",
    "恋愛",
    "好きと嫌い",
  ];
  const phrases = [
    "またね",
    "お世話になりました",
    "いただきます！",
    "お先に",
    "いってきます",
    "久しぶりだね",
    "遅れてごめんなさい",
    "じゃあね",
    "どうぞ入ってください",
    "お会いできてよかったです",
    "元気でね",
    "良い一日を",
    "仕事頑張って",
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [subDrawerOpen, setSubDrawerOpen] = React.useState(false);

  const handleSubDrawerToggle = () => {
    setSubDrawerOpen(!mobileOpen);
  };

  const onClickVoice = () => {
    var audio = document.getElementById("voiceTitle");

    if (!(audio instanceof HTMLMediaElement)) {
      throw new Error("#audio is not an HTMLMediaElement");
    }

    audio.volume = 0.2;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Toolbar
          component="div"
          style={{ display: "block", textAlign: "center", padding: "5px 0" }}
        >
          <Typography variant="h6">カテゴリー</Typography>
          <Typography variant="caption">近日追加予定</Typography>
        </Toolbar>
      </div>

      <Divider />
      <List>
        {categories.map((text, index) => (
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
              <Typography variant="h6">フレーズ</Typography>
              <Typography variant="caption">近日追加予定</Typography>
            </div>
          </Toolbar>
        </div>
        <Divider />
        <List>
          {phrases.map((text, index) => (
            <ListItem button key={text} divider onClick={handleSubDrawerToggle}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
      <Container maxWidth="md">
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
                日本語学習アプリ
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
            <Card className={classes.cardHolder} variant="outlined">
              <Card className={classes.cardRoot}>
                <audio id="voiceTitle" src="./audio/4.mp3"></audio>
                <CardActionArea onClick={onClickVoice}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="p">
                      嫌な予感がする
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      I have a bad feeling about this.
                    </Typography>
                    <IconButton className={classes.cardIcon}>
                      <VolumeUpSharpIcon fontSize="small" color="disabled" />
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Divider variant="middle" style={{ marginBottom: "24px" }} />
              <Card className={classes.cardRootLeft}>
                <CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="p">
                      なぁ、どうした？なんだか不安そうだけど。
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
                <CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="p">
                      分からないけど、ただ嫌な予感がする
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
                理由は分からないが「嫌な予感がする」「妙な胸騒ぎがする」などと言うときに使います。
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
                <Tab icon={<ForumIcon />} label="フレーズ" {...a11yProps(0)} />
                <Tab icon={<MenuBookIcon />} label="学習" {...a11yProps(1)} />
                <Tab icon={<LiveHelpIcon />} label="質問" {...a11yProps(2)} />
                <Tab icon={<SearchIcon />} label="検索" {...a11yProps(3)} />
              </Tabs>
            </Paper>
          </AppBar>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
