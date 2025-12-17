import React, { useState } from 'react';

export const AvatarUploader: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Custom Avatar</h3>
      {avatarUrl && <img src={avatarUrl} className="w-32 h-32 rounded-full" alt="Avatar" />}
      <input type="file" accept="image/*" onChange={handleUpload} className="block" />
    </div>
  );
};
