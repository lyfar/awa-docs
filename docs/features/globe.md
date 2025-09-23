---
sidebar_position: 9
---
version: "0.1"

# Globe

## Feature Name
Globe

## Overview
The Globe feature provides users with an interactive 3D visualization of the AWATERRA community, allowing them to locate and track their activity and see others in their vicinity. It displays real-time user activity through particles and visual effects, creating a sense of global connection and community.

## Purpose
The business need this feature addresses is creating a sense of global community and belonging, allowing users to see their place in the larger AWATERRA ecosystem and feel connected to other practitioners worldwide.

## User Stories

### Primary User Story
As a user, I want to see my location and activity on a global map so that I can feel connected to the worldwide AWATERRA community.

### Secondary User Stories
- As a user, I want to see other users' activity in my area
- As a user, I want to invite friends to join the community
- As a user, I want to see real-time updates of global activity
- As a user, I want to interact with the globe through gestures

## UI/UX Requirements

### Visual Design
- Interactive 3D globe centered on user's location
- Bright golden pulsing point at user's location
- Spreading circle animations from user's point
- Other surrounding points illuminated
- AWA Pulse counter acceleration effect
- Invite friend functionality with shareable links

### User Flow
1. User opens app during onboarding or main page
2. Globe centers on user's geolocation
3. Bright golden point pulses at center
4. Animation of spreading circles from point
5. Other points around user illuminate
6. AWA Pulse counter accelerates for several seconds
7. User can invite friends via shareable link

### Accessibility
- Alternative text for visual elements
- Haptic feedback for interactions
- Audio cues for important events
- Clear visual indicators for user location

## Technical Requirements

### Frontend
- 3D globe rendering engine
- Interactive gesture controls (rotate, zoom)
- Real-time particle system for user activity
- Geolocation integration
- Animation and visual effects system
- Share functionality for invitations

### Backend
- User location tracking and storage
- Real-time activity data aggregation
- Invitation link generation and tracking
- AWA Pulse calculation and updates
- User proximity detection
- Analytics for community engagement

### Data Models
- User location coordinates
- Activity timestamps and data
- Invitation links and tracking
- AWA Pulse metrics
- Community engagement data
- User proximity relationships

### Integrations
- Geolocation services
- Real-time data streaming
- Social sharing APIs
- Analytics platform
- Push notification system

## Dependencies

### Required Capabilities
- [02. Visualization & Map Layer](/docs/capabilities/02-Visualization-Map-Layer) - Core visualization system
- [03. Access](/docs/capabilities/03-Access) - Location permissions
- [06. Engagement & Notifications](/docs/capabilities/06-Engagement-Notifications) - Invitation system

### Required Features
- User location services
- 3D rendering engine
- Real-time data updates
- Social sharing functionality

### External Dependencies
- 3D rendering libraries
- Geolocation APIs
- Real-time data services
- Social sharing platforms

## Version Information

- **Target Version**: 0.1 Photon
- **Priority**: High
- **Status**: Done (In Progress)
- **Estimated Effort**: 4-5 weeks
- **Start Date**: 2025/09/20
- **End Date**: 2025/10/03

## Acceptance Criteria

### Functional Requirements
- User's location is visible and accurate
- User's activity is displayed in real-time
- Last practice time is updated correctly
- Other users' activity is visible in vicinity
- Invitation links work correctly
- AWA Pulse counter accelerates appropriately

### Non-Functional Requirements
- Globe renders smoothly (60fps)
- Real-time updates within 5 seconds
- Location accuracy within 100 meters
- Responsive design for different screen sizes
- Battery efficient rendering

### Testing Requirements
- Unit tests for location tracking
- Integration tests for real-time updates
- Performance tests for 3D rendering
- User experience tests for interactions
- End-to-end tests for invitation flow

## Implementation Notes

### Technical Considerations
- Implement efficient 3D rendering for smooth performance
- Use proper geolocation handling with privacy considerations
- Implement real-time data synchronization
- Consider performance impact of multiple users
- Design for offline functionality

### Design Considerations
- Design for intuitive gesture controls
- Ensure visual effects don't overwhelm users
- Consider different lighting conditions
- Design for various screen sizes and orientations
- Consider cultural differences in map representations

### Risk Factors
- Performance issues with complex 3D rendering
- Privacy concerns with location tracking
- Battery drain from continuous location updates
- Real-time data synchronization failures
- User experience issues with complex interactions

## Examples

### Visual Effects
- **Globe Centering**: Automatically centers on user's location
- **Golden Point**: Bright pulsing point at user's location
- **Spreading Circles**: Animation of circles expanding from user's point
- **Surrounding Points**: Other users' activity illuminated
- **Pulse Acceleration**: AWA Pulse counter speeds up temporarily
- **Invite Friend**: Copy link to invite others to join AWATERRA

### Implementation Tasks
- [Map] Usecase - Map Integration with Real Data
- [Map] Net data - Map Integration with Real Data
- [Map] UI - final implementation of globe
- [Map] Vibration helper
- [Map] Sound helper
- [API][Map] POST /map
- [Users count] UI
- [Users count] Usecase
- [Users count] Net data

### Code Examples
```javascript
// Example Globe interaction
class GlobeService {
  async initializeGlobe(userLocation) {
    try {
      // Center globe on user location
      await this.centerGlobeOnLocation(userLocation);
      
      // Start pulsing animation at user's point
      await this.startPulsingAnimation(userLocation);
      
      // Load nearby user activity
      const nearbyActivity = await this.getNearbyActivity(userLocation);
      
      // Illuminate surrounding points
      await this.illuminateNearbyPoints(nearbyActivity);
      
      // Accelerate AWA Pulse counter
      await this.accelerateAWAPulse();
      
      return {
        userLocation,
        nearbyActivity,
        pulseAcceleration: true
      };
    } catch (error) {
      throw new Error(`Globe initialization failed: ${error.message}`);
    }
  }
  
  async inviteFriend(userId) {
    const inviteLink = await this.generateInviteLink(userId);
    return {
      link: inviteLink,
      message: "Join me in the AWATERRA community!"
    };
  }
}
```

## Related Documentation

- [02. Visualization & Map Layer](/docs/capabilities/02-Visualization-Map-Layer)
- [03. Access](/docs/capabilities/03-Access) - Location permissions
- [06. Engagement & Notifications](/docs/capabilities/06-Engagement-Notifications)
- [Features Overview](/docs/features/intro)
- [Development Roadmap](/docs/roadmap/intro)

---
version: "0.1"

*Feature last updated: December 2024*
