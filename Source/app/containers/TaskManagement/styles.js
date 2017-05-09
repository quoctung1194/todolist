import common_styles from '../Index/styles';

export default styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  comming_region: {
    flex: 5,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  comming_region_start: {
    flex: 1,
  },
  comming_region_center: {
    flex: 3,
    alignItems: 'center',
  },
  comming_region_end: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  current_region: {
    flex: 2,
  },
  done_region: {
    flex: 1.5,
    borderTopWidth: 2,
  },
  add_button: {
    fontSize: 35,
    color: common_styles.primary_color.backgroundColor,
    marginTop: 2,
    marginRight: 5
  },
  load_more_button: {
    fontSize: 50,
  },
  done_region_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}
