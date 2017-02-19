import React from 'react';
import {
    StyleSheet,
    ListView,
    View,
} from 'react-native';

import { RemindersListItem } from '../remindersListItem';

export default function(props) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const data = ds.cloneWithRows(props.reminders);

    return (
        <View style={ styles.component }>
            <ListView
                enableEmptySections={ true }
                style={ styles.listView }
                initialListSize={ 5 }
                dataSource={ data }
                renderRow={ reminder =>
                    <RemindersListItem
                        removeReminder={ props.removeReminder }
                        editReminder={ props.editReminder }
                        reminder={ reminder }
                    />
                }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
    listView: {
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
});
