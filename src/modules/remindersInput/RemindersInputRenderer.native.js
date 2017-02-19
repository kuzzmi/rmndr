import React from 'react';
import {
    StyleSheet,
    Button,
    TextInput,
    View,
} from 'react-native';

export default function(props, state) {
    const { rawTitle/* , id */, canSave } = state;

    return (
        <View style={ styles.component }>
            <View style={ styles.inputContainer }>
                <TextInput
                    style={ styles.input }
                    value={ rawTitle }
                    placeholder="What and when?"
                    onChangeText={ this.handleTitleChange }
                    onEndEditing={ this.handleSave }
                    blurOnSubmit={ true }
                />
                {
                    canSave &&
                    <Button
                        title="+"
                        color="#e6a8dd"
                        style={ styles.button }
                        onPress={ this.handleSave }
                        accessibilityLabel="Save reminder"
                        />
                }
            </View>
            <View style={ styles.border } />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    border: {
        flex: 1,
        height: 1,
        backgroundColor: '#EFEEEF',
    },
    input: {
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
    button: {
    },
});
