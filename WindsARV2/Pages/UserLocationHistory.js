import React from 'react';
import BackArrow from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

class UserLocationHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteChoice: false,
    };
  }

  render() {
    const {userHistory} = this.props.userHistory;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonStyle}>
          <BackArrow
            name="arrow-back"
            Icon
            style={{color: '#FFF'}}
            size={wp('6%')}
            onPress={() => this.props.navigation.goBack()}></BackArrow>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={styles.text1}>Location History</Text>

          <ScrollView>
            <SafeAreaView>
              {userHistory && userHistory.length ? (
                userHistory.map(historyObj => (
                  <View key={historyObj.id} style={styles.section}>
                    <Text style={styles.stext}>{historyObj.name}</Text>
                    <Text style={styles.stext1}>{historyObj.time}</Text>
                    <Text style={styles.stext1}>{historyObj.address}</Text>
                    <View style={styles.subSection}>
                      <Text style={styles.innertext}>
                        {historyObj.visitedWhen}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text></Text>
              )}
            </SafeAreaView>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userHistory: state.user,
});

export default connect(mapStateToProps, null)(UserLocationHistory);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 36, 86, 1)',
  },

  heading1: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#002456',
  },

  heading2: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#002456',
  },

  heading3: {
    fontSize: hp('2%'),
    fontWeight: '100',
    color: '#002456',
  },

  image: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    resizeMode: 'contain',
    opacity: 0.8,
    backgroundColor: 'black',
    height: 100,
    alignItems: 'center',
  },

  top: {
    flex: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerImage: {
    width: 200,
    height: 200,
  },

  bottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 36, 86, 1)',
    width: wp('100%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text1: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#FECE05',
    marginTop: wp('04%'),
    marginBottom: wp('08%'),
  },

  section: {
    flex: 0.3,
    width: wp('85%'),
    height: hp('17.8%'),
    marginBottom: hp('5%'),
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  iconContainer: {
    height: 100,
    left: 150,
    bottom: 80,
    justifyContent: 'space-evenly',
  },

  iconStyle: {
    backgroundColor: 'gold',
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
  },

  backButtonStyle: {
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
    marginTop: hp('2%'),
    color: '#fff',
  },

  buttonContainer: {
    width: wp('85%'),
    height: wp('12%'),
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonStyling: {
    width: wp('36%'),
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonStyling1: {
    width: wp('36%'),
    backgroundColor: '#B42D20',
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
  },

  stext: {
    fontSize: hp('3.2%'),
    fontWeight: 'bold',
    color: '#002456',
    marginTop: hp('2%'),
    marginLeft: wp('3.5%'),
    width: 270,
  },

  stext1: {
    fontSize: hp('2%'),
    fontWeight: 'normal',
    color: '#696969',
    marginTop: hp('0.2%'),
    marginLeft: wp('3.8%'),
    marginBottom: wp('1%'),
    textAlign: 'left',
  },

  subSection: {
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#FECE05',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  innertext: {
    fontStyle: 'normal',
    fontSize: hp('2.1%'),
    fontWeight: 'bold',
    color: '#002456',
    textAlign: 'center',
  },
});
