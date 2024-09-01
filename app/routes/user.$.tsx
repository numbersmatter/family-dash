import { UserProfile } from '@clerk/remix'
import React from 'react'

export default function UserProfilePage() {
  return <UserProfile path="/user" />
}