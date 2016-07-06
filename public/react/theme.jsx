import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  palette: {
    primary1Color: '#449D44',
    primary2Color: Colors.lightBlue500,
    primary3Color: '#306284',
    accent1Color: Colors.cyan500, //'#C9302C',
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
    backgroundColor: '#efefef',
    avatarBackgroundColor: Colors.orange700
  },
  font: {
    primary1Family: 'Dosis',
    primary2Family: 'ubuntu',
    defaultFamily: 'Roboto, Open Sans, sans-serif'
  }
};
