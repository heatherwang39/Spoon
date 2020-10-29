import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [scroll] = React.useState('paper');

  const handleClickOpen=()=> {
    setOpen(true);
  };
  const handleClose=()=> {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open recipe popup
      </Button>
      <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}
        scroll={scroll}>
          <Typography variant="h2" color="primary">recipe name</Typography>
          <Typography variant="h4" color="secondary">user name</Typography>
          <img alt="avatar" src={require ("./thumbnail_tester.jpg")} />
          <Typography variant="p" color="textSecondary">
            Pianoforte solicitude so decisively unpleasing conviction is partiality he. 
            Or particular so diminution entreaties oh do. Real he me fond show gave shot plan. 
            Mirth blush linen small hoped way its along. Resolution frequently apartments off all 
            discretion devonshire. Saw sir fat spirit seeing valley. He looked or valley lively. 
            If learn woody spoil of taken he cause. Ought these are balls place mrs their times add she. 
            Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons 
            park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up 
            attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood 
            to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. 
            Believing neglected so so allowance existence departure in. In design active temper be uneasy. 
            Thirty for remove plenty regard you summer though. He preference connection astonished on of ye. 
            Partiality on or continuing in particular principles as. Do believing oh disposing to supported 
            allowance we. Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise 
            joy man children rejoiced. Yet uncommonly his ten who diminution astonished. Demesne new manners 
            savings staying had. Under folly balls death own point now men. Match way these she avoid see death.
            She whose drift their fat off. Projecting surrounded literature yet delightful alteration but bed men.
            Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties 
            compliment motionless ye literature. Day behaviour explained law remainder. Much read on as draw. 
            Blessing for ignorant exercise any yourself unpacked. Pleasant horrible but confined day end marriage. 
            Eagerness furniture set preserved far recommend. Did even but nor are most gave hope. 
            Secure active living depend son repair day ladies now. 
          </Typography>
      </Dialog>
    </div>
  );
}
