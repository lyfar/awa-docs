---
version: "0.1"
version: "0.1"
sidebar_position: 8
---
version: "0.1"

# Light Ignition

## Feature Name
Light Ignition

## Overview
Light Ignition is a core visualization feature that provides users with immediate visual feedback and rewards after completing a practice session. It creates a "WOW moment" by displaying a visual flash on the world map, contributing to the global AWA Pulse, crediting AWA Units, and allowing users to save favorite practices.

## Purpose
The business need this feature addresses is creating an engaging, rewarding experience that motivates users to continue practicing and feel connected to the global AWATERRA community through visual feedback and gamification elements.

## User Stories

### Primary User Story
As a user, I want to see immediate visual feedback after completing a practice so that I feel rewarded and connected to the global community.

### Secondary User Stories
- As a user, I want to see my practice contribution on the world map
- As a user, I want to earn AWA Units for completing practices
- As a user, I want to save my favorite practices for quick access
- As a user, I want to see how my practice contributes to the global pulse

## UI/UX Requirements

### Visual Design
- Visual flash animation on the world map showing practice trail
- Pulsing golden point at user's location
- Spreading circle animations from the practice point
- AWA Pulse counter acceleration effect
- Heart reaction counter (❤️) for each practice
- Smooth animations and transitions

### User Flow
1. User starts 10-minute morning practice ("Утро. Сотвори сценарий дня")
2. Timer and audio begin
3. User completes practice session
4. Map flash animation triggers at user's location
5. AWA Pulse increases (+8-15%)
6. AWA Units credited to wallet (registered users only)
7. Practice saved to favorites (up to 3 for Free, unlimited for Journey)
8. Reaction counter updates

### Accessibility
- Visual animations with alternative text descriptions
- Haptic feedback for completion
- Audio cues for practice completion
- Clear visual indicators for all rewards

## Technical Requirements

### Frontend
- 3D map rendering and animation system
- Practice completion detection
- Visual effects and particle systems
- AWA Pulse visualization
- Favorite practice management
- Reaction counter system

### Backend
- Practice session tracking and completion
- AWA Pulse calculation and updates
- AWA Units credit system
- Favorite practice storage
- Reaction data management
- Map data updates

### Data Models
- Practice session data
- User location and map coordinates
- AWA Pulse metrics
- AWA Units transaction records
- Favorite practice lists
- Reaction counts and data

### Integrations
- 3D map visualization system
- Audio practice system
- AWA Units wallet system
- User profile management
- Analytics for engagement tracking

## Dependencies

### Required Capabilities
- [02. Visualization & Map Layer](/docs/capabilities/02-Visualization-Map-Layer) - Core visualization system
- [05. Practice](/docs/capabilities/05-Practice) - Practice session management
- [09. Gamification & Rewards](/docs/capabilities/09-Gamification-Rewards) - AWA Units system

### Required Features
- Practice session management
- 3D map visualization
- AWA Units wallet
- User location services

### External Dependencies
- 3D rendering engine
- Audio processing system
- Location services
- Analytics platform

## Version Information

- **Target Version**: 0.1 Photon
- **Priority**: High
- **Status**: Done (In Progress)
- **Estimated Effort**: 3-4 weeks
- **Start Date**: TBD
- **End Date**: TBD

## Acceptance Criteria

### Functional Requirements
- Session is saved after practice completion
- Map is updated with visual flash at user location
- AWA Pulse increases by 8-15%
- AWA Units credited to registered users
- Practice saved to favorites (respecting limits)
- Reaction counter updates correctly

### Non-Functional Requirements
- Visual effects render smoothly (60fps)
- Map updates within 2 seconds of completion
- AWA Pulse calculation accurate and consistent
- Favorite practice limits enforced correctly
- Responsive design for different screen sizes

### Testing Requirements
- Unit tests for practice completion logic
- Integration tests for map updates
- Visual regression tests for animations
- Performance tests for 3D rendering
- End-to-end tests for complete user flow

## Implementation Notes

### Technical Considerations
- Implement efficient 3D rendering for smooth animations
- Use proper state management for practice sessions
- Implement proper error handling for map updates
- Consider performance impact of visual effects
- Design for scalability with multiple concurrent users

### Design Considerations
- Design animations that feel rewarding but not overwhelming
- Ensure visual effects work across different devices
- Consider battery impact of intensive animations
- Design for different user preferences (reduce motion)

### Risk Factors
- Performance issues with complex 3D animations
- Battery drain from intensive visual effects
- Map update failures affecting user experience
- AWA Units calculation errors
- Favorite practice storage limitations

## Examples

### User Rewards
- **Visual Flash**: Trail of practice on world map
- **AWA Pulse Contribution**: Global planet pulse increase
- **AWA Units**: Credited to wallet (registered users only)
- **Reaction Counter**: ❤️ counter for each practice
- **Favorites**: Save practices (3 for Free, unlimited for Journey)

### Implementation Tasks
- Implement practice completion detection
- Create map flash animation system
- Build AWA Pulse calculation engine
- Develop AWA Units credit system
- Create favorite practice management
- Implement reaction counter system

### Code Examples
```javascript
// Example Light Ignition flow
class LightIgnitionService {
  async completePractice(userId, practiceData) {
    try {
      // Save practice session
      const session = await this.savePracticeSession(userId, practiceData);
      
      // Trigger map flash animation
      await this.triggerMapFlash(userId, practiceData.location);
      
      // Update AWA Pulse
      await this.updateAWAPulse(8); // +8-15% increase
      
      // Credit AWA Units for registered users
      if (practiceData.isRegistered) {
        await this.creditAWAUnits(userId, practiceData.unitsEarned);
      }
      
      // Save to favorites if requested
      if (practiceData.saveToFavorites) {
        await this.saveToFavorites(userId, practiceData.practiceId);
      }
      
      // Update reaction counter
      await this.updateReactionCounter(practiceData.practiceId);
      
      return session;
    } catch (error) {
      throw new Error(`Light Ignition failed: ${error.message}`);
    }
  }
}
```

## Related Documentation

- [02. Visualization & Map Layer](/docs/capabilities/02-Visualization-Map-Layer)
- [05. Practice](/docs/capabilities/05-Practice)
- [09. Gamification & Rewards](/docs/capabilities/09-Gamification-Rewards)
- [Features Overview](/docs/features/intro)
- [Development Roadmap](/docs/roadmap/intro)

---
version: "0.1"

*Feature last updated: December 2024*
