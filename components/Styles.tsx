import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100
  },
  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  header: {
    marginBottom: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  news: {
    alignItems: 'center',
    marginBottom: 20
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  input: {
    width: '80%',
    height: 50,
    margin: 20,
    backgroundColor: 'white'
  },
  headerContainerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonReturn: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonReturnContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    alignItems: 'center'
  },
  buttonSecondary: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28a745',
    justifyContent: 'center'
  },
  buttonTextSecondary: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonGoogle: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
