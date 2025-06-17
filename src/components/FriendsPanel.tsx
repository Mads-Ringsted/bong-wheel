import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = friends.filter(friend => friend.isSelected).length;

  return (
    <>
      {/* Dropdown Toggle Button */}
    <button 
      className="friends-toggle-btn"
      onClick={() => setIsOpen(!isOpen)}
    >
       🍺 Vælg bongers ({selectedCount}/{friends.length})
    </button>

      {/* Dropdown Overlay */}
      {isOpen && (
        <>
          <div className="friends-overlay" onClick={() => setIsOpen(false)} />
          <div className="friends-dropdown">
            <div className="friends-dropdown-header">
              <h3>Vælg bongers</h3>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="select-all-controls">
              <button className="control-btn" onClick={onSelectAll}>
                Vælg alle
              </button>
              <button className="control-btn" onClick={onSelectNone}>
                Fravælg alle
              </button>
            </div>

            <div className="friends-list">
              {friends.map((friend) => (
                <label
                  key={friend.id}
                  className={`friend-item ${friend.isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={friend.isSelected}
                    onChange={() => onFriendToggle(friend.id)}
                    className="friend-checkbox"
                  />
                  <div
                    className="friend-color"
                    style={{ backgroundColor: friend.color }}
                  />
                  <span className="friend-name">{friend.name}</span>
                </label>
              ))}
            </div>
            <div className="gem-button-container">
                <button className='gem-button' onClick={() => setIsOpen(false)}>
                    Gem
                </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FriendsPanel;
