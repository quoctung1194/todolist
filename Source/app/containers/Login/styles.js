import main_styles from '../Index/styles';

export default styles = {
  main: {
    flex: 1,
    flexDirection: 'column',
    margin: 3,
  },
  button_login: {
    marginTop: 20,
    ...main_styles.primary_color,
  }
};
