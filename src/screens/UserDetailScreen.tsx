/**
 * UserDetailScreen
 * Displays detailed information about a user
 */

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Avatar, Card, Text, Loading, EmptyState } from '@ui';
import { useUser } from '@hooks';
import { COLORS, SPACING } from '@constants';
import { getErrorMessage, formatPhoneNumber } from '@utils';
import type { RootStackParamList } from '@types';

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export const UserDetailScreen: React.FC = () => {
  const route = useRoute<UserDetailRouteProp>();
  const { userId } = route.params;

  const { data: user, isLoading, isError, error } = useUser(userId);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError || !user) {
    return (
      <View style={styles.centerContainer}>
        <EmptyState icon="⚠️" title="Error Loading User" description={getErrorMessage(error)} />
      </View>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Avatar
          source={user.image}
          size="large"
          initials={`${user.firstName[0]}${user.lastName[0]}`}
        />
        <Text variant="h1" style={styles.name}>
          {fullName}
        </Text>
        <Text variant="body1" style={{ color: COLORS.textSecondary }}>
          @{user.username}
        </Text>
      </View>
      {/* Contact Information */}
      <Card style={styles.card}>
        <Text variant="h3" style={styles.sectionTitle}>
          Contact Information
        </Text>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Email:
          </Text>
          <Text variant="body1">{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Phone:
          </Text>
          <Text variant="body1">{formatPhoneNumber(user.phone)}</Text>
        </View>
      </Card>

      {/* Personal Information */}
      <Card style={styles.card}>
        <Text variant="h3" style={styles.sectionTitle}>
          Personal Information
        </Text>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Age:
          </Text>
          <Text variant="body1">{user.age} years old</Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Gender:
          </Text>
          <Text variant="body1">{user.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Birth Date:
          </Text>
          <Text variant="body1">{user.birthDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body1" style={{ color: COLORS.textSecondary }}>
            Blood Group:
          </Text>
          <Text variant="body1">{user.bloodGroup}</Text>
        </View>
      </Card>

      {/* Company Information */}
      {user.company && (
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Company
          </Text>
          <View style={styles.infoRow}>
            <Text variant="body1" style={{ color: COLORS.textSecondary }}>
              Name:
            </Text>
            <Text variant="body1">{user.company.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body1" style={{ color: COLORS.textSecondary }}>
              Title:
            </Text>
            <Text variant="body1">{user.company.title}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body1" style={{ color: COLORS.textSecondary }}>
              Department:
            </Text>
            <Text variant="body1">{user.company.department}</Text>
          </View>
        </Card>
      )}

      {/* Address */}
      {user.address && (
        <Card style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>
            Address
          </Text>
          <Text variant="body1">
            {user.address.address}
            {'\n'}
            {user.address.city}, {user.address.state} {user.address.postalCode}
            {'\n'}
            {user.address.country}
          </Text>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.md,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  name: {
    marginTop: SPACING.md,
  },
  card: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
});
