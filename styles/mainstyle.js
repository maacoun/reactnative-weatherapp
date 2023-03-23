import { Dimensions, StyleSheet } from 'react-native';
const colors = {
    primary: '#03318c', // blue
    secondary: '#17191b', // dark grey
    text: '#fff', // white
    background: '#0c0f12', // black
    shadow: '#000', // black
    correct: '#247505', // green
    incorrect: '#740504', // red
};


const mainstyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
      },
      logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20
      },
      appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20
      },
      input: {
        flex: 1,
        fontSize: 18,
        color: '#333333'
      },
      icon: {
        padding: 10
      },
      gpsButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
      },
      gpsButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
      }
});