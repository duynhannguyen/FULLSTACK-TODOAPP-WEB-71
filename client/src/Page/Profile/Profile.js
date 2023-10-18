import React from "react";

const Profile = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <label htmlFor="avatar"> Upload avatar </label>
      <input
        className="hidden"
        id="avatar"
        type="file"
        accept="image/*"
        name="avatar"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Profile;
