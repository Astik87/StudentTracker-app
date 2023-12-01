import React from 'react';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { userSelector } from '../../model/selectors/userSelector.ts';

const UserAvatar = () => {
  const user = useSelector(userSelector);

  if (!user) {
    return <></>;
  }

  const label = user.firstName[0] + user.lastName[0];

  return (
    <View style={styles.main}>
      <Avatar.Text size={40} label={label} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
  },
});

export default UserAvatar;
