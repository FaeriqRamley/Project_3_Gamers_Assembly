



rootReducer = combineReducers({ schedule: scheduleReducer, profile: profileReducer, friendList: friendListReducer })
// This would produce the following state object
{
  schedule: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  profile: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
    friendList: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
