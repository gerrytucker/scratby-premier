import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
    container: ViewStyle;
    cartOverview: ViewStyle;
    leftCartOverview: ViewStyle;
    textTotal: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'flex-start'
  },
  cartOverview: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftCartOverview: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  }
});

export default styles;
