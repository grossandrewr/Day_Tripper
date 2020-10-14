import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import {fetchAllTrips} from '../store'

class AllTrips extends Component {
  componentDidMount(){
    this.props.fetchAllTrips(this.props.user.id)
  }

  render(){
    console.log("TRIPS---", this.props.trips)
    return (
      <View>
        {
          this.props.trips.map((trip) => {
            return <Text key={trip.id}>{trip.title}</Text>
          })
        }
      </View>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  trips: state.trips.allTrips
})

const mapDispatch = (dispatch) => ({
  fetchAllTrips: (userId) => dispatch(fetchAllTrips(userId))
})

export default connect(mapState, mapDispatch)(AllTrips)