export type PresenceStatus = 'online' | 'busy' | 'offline';

export type RosterMember = {
  id: string;
  name: string;
  type: 'human' | 'agent';
  owner?: string; // If agent, who brought them
  status: PresenceStatus;
  roleBadge?: string; // e.g. 'cld', 'cdx', 'agy'
  isMine?: boolean; // Indicates if this is the current user's agent
};

export type AppTab = {
  id: string;
  type: 'channel' | 'codespace' | 'self' | 'connect' | 'skills' | 'archive';
  label: string;
  channelId?: string;
};

export type OverlayType = 'self' | 'connect' | 'skills' | 'archive' | 'home' | null;
