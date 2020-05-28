import React, { PureComponent } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import Captions from '../utils/Captions'

const { width } = Dimensions.get('window');

function OfflineDisplay(props) {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>
          { (props.isLogin) ? Captions.loginUnavailable : Captions.editingUnavailable } 
      </Text>
    </View>
  );
}

export default class OfflineNotifier extends PureComponent {
  _isMounted = false
  state = {
    isConnected: true
  };

  unsubscribe = null

  constructor(props) {
      super(props)
  }

  componentDidMount() {
    this._isMounted = true
    unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        this.setState({ isConnected: state.isConnected})
        this.props.offlineStateChanged(state.isConnected)
      });
  }

  componentWillUnmount() {
    if (this._isMounted) {
        if (this.unsubscribe !== null) 
            this.unsubscribe()
        this._isMounted = false
    }
  }

  render() {
    if (!this.state.isConnected) {
        return (<OfflineDisplay isLogin={this.props.isLogin} />);
        }
        return null
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
  },
  offlineText: { color: '#fff' }
});