import common_styles from '../Index/styles';

export default styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  comming_region: {
    flex: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  comming_region_start: {
    flex: 1,
  },
  comming_region_center: {
    flex: 3,
  },
  comming_region_end: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  current_region: {
    flex: 3,
  },
  done_region: {
    flex: 2,
    borderTopWidth: 2,
  },
  add_button: {
    fontSize: 35,
    color: common_styles.primary_color.backgroundColor,
    marginTop: 2,
    marginRight: 5
  },
  load_more_button: {
    fontSize: 35,
    flex: 3,
  }
}
