import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    news: {
      alignItems: 'center',
      marginBottom: 20,
    },
    newsHeadline: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white',
    },
    newsDescription: {
      textAlign: 'center',
      marginBottom: 20,
      color: 'white',
    },
    button: {
      backgroundColor: 'tomato',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerContainer: {
      textAlign: 'center',
      margin: 10,
    },
    MainContainer: {
        textAlign: 'center',
        margin: 10,
        padding: 10,
    },
  });