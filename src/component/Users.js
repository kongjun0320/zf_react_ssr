import React from 'react';

function Users({ resource }) {
  let list = resource.read();
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default Users;
