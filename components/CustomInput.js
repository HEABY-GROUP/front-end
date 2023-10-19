import { Text, TextInput, StyleSheet} from 'react-native'

export function InputRegistro({text,...restProps}){
    return <>
        <Text style={styles.TextForm}>{text}</Text>
        <TextInput
          style={styles.InputForm}
          value={""}
          onChangeText={()=>{}}
          {...restProps}
        />
    </>
}


const styles = StyleSheet.create({
    TextForm: {
        color: "rgba(55, 65, 81,1)",
        marginLeft: 16,
        marginBottom: 8,
      },
    InputForm: {
      padding: 16,
      width: "100%",
      backgroundColor: "rgba(243, 244, 246, 1)",
      color: "rgba(55, 65, 81,1)",
      borderRadius: 16,
      marginBottom: 20,
    },
  });