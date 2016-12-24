import React from 'react';
import {
    StyleSheet,
    Button,
    TextInput,
    View,
} from 'react-native';

export default function(props, state) {
    const { rawTitle, id, canSave } = state;

    return (
        <View style={ styles.component }>
            <TextInput
                style={ styles.input }
                value={ rawTitle }
                placeholder="What and when?"
                onChangeText={ this.handleTitleChange }
                onEndEditing={ this.handleSave }
            />
            <Button
                title="+"
                onPress={ this.handleSave }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
    },
    text: {
        fontSize: 16,
    },
});
