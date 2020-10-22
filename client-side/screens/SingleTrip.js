import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { fetchAllTrips, updateStatus, fetchAllEvents, setCoords } from '../store'
import { List, Divider } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';
import defaultStyles from './styles'

export class SingleTrip extends Component {
  constructor() {
    super()
  }

  componentDidUpdate = async () => {
    await this.props.fetchAllEvents(this.props.singleTrip.id)
    await this.props.setCoords(this.props.singleTrip.mapLocation.coordinate)
  }

  acceptInvite = () => {
    this.props.updateStatus(this.props.singleTrip.id, this.props.user.id, "accepted")
    this.props.fetchAllTrips(this.props.user.id);
  }
  declineInvite = () => {
    this.props.updateStatus(this.props.singleTrip.id, this.props.user.id, "rejected")
    this.props.navigation.navigate("AllTrips")
    this.props.fetchAllTrips(this.props.user.id);
  }

  render() {
    const startDate = new Date(this.props.singleTrip.startDate)
    const endDate = new Date(this.props.singleTrip.endDate)

    return (
      <View style={defaultStyles.singleContainer}>
        {
          this.props.singleTrip.userTrips && this.props.singleTrip.userTrips[0].status === "pending" ?
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.acceptInvite()}>
                <Text style={defaultStyles.buttonTitle}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.declineInvite()}>
                <Text style={defaultStyles.buttonTitle}>Decline</Text>
              </TouchableOpacity>
            </View>
            : true
        }
        <ScrollView>
          <List.Section >
            <Text style={{...defaultStyles.text, textAlign: "center", fontSize: 25, fontWeight: "bold"}}>{this.props.singleTrip.title}</Text>
            <Divider style={defaultStyles.divider}/>
            <Text style={defaultStyles.text}>Start: {startDate.toLocaleString('en-US')}</Text>
            <Divider style={defaultStyles.divider}/>
            <Text style={defaultStyles.text}>End: {endDate.toLocaleString('en-US')}</Text>
            <Divider style={defaultStyles.divider}/>
            <Text style={defaultStyles.text}>Notes: {this.props.singleTrip.notes}</Text>
          </List.Section>
          <View style={defaultStyles.singleContainer}>
            <MapView
              initialRegion={this.props.mapCoords}
              style={styles.mapStyle}
            >
              <Marker
                coordinate={this.props.mapCoords}
                title={this.props.singleTrip.title}
                description={this.props.singleTrip.notes}
              >
                <Image source={require('../assets/house.png')} style={{ height: 22, width: 22, tintColor: "#60656F" }} />
              </Marker>
            </MapView>
          </View>
        </ScrollView>
      </View >
    )
  }
}

const mapState = (state) => ({
  singleTrip: state.trips.singleTrip,
  user: state.user,
  mapCoords: state.map
})

const mapDispatch = (dispatch) => ({
  updateStatus: (tripId, userId, status) => dispatch(updateStatus(tripId, userId, status)),
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId)),
  fetchAllEvents: (tripId) => dispatch(fetchAllEvents(tripId)),
  setCoords: (coords) => dispatch(setCoords(coords))
})

export default connect(mapState, mapDispatch)(SingleTrip)

const styles = StyleSheet.create({
  button: {
    ...defaultStyles.button,
    width: 125,
    marginLeft: 15,
    marginRight: 15,
  },
  mapStyle: {
    width: '90%',
    height: '35%',
    borderWidth: 1,
    borderRadius: 7
  }

})
