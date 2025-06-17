import type { Friend } from '../types';

interface FriendsPanelProps {
  friends: Friend[];
  onFriendToggle: (friendId: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
}

const FriendsPanel: React.FC<FriendsPanelProps> = ({
  friends,
  onFriendToggle,
  onSelectAll,
  onSelectNone,
}) => {
  const selectedCount = friends.filter(friend => friend.isSelected).length;

  return (
    <div className="friends-panel">
      <h2>
        🎵 Friends ({selectedCount}/{friends.length} selected)
      </h2>
      
      <div className="select-all-controls">
        <button className="control-btn" onClick={onSelectAll}>
          Select All
        </button>
        <button className="control-btn" onClick={onSelectNone}>
          Select None
        </button>
      </div>
      
      <div className="friends-list">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`friend-item ${friend.isSelected ? 'selected' : ''}`}
            onClick={() => onFriendToggle(friend.id)}
          >
            <input
              type="checkbox"
              className="friend-checkbox"
              checked={friend.isSelected}
              onChange={() => onFriendToggle(friend.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <div
              className="friend-color"
              style={{ backgroundColor: friend.color }}
            />
            <span className="friend-name">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPanel;
