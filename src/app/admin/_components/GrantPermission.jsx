import React, { useState, useEffect, use } from 'react';

const PermissionSwitches = ({ initialPermissions, onChange }) => {
    const [permissions, setPermissions] = useState(initialPermissions || {});
    

    useEffect(() => {
        onChange?.(permissions); // chama callback quando permissions muda
        // console.log(permissions)
    }, [permissions]);

    useEffect(() => {
        setPermissions(initialPermissions)

    }, [initialPermissions])

    const handleToggle = (key) => {
        setPermissions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div style={{ display: 'grid', gap: '10px' }}>
            {Object.keys(permissions).map((key) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                        type="checkbox"
                        checked={permissions[key]}
                        onChange={() => handleToggle(key)}
                    />
                    {key.replace('_', ' ').toUpperCase()}
                </label>
            ))}
        </div>
    );
};

export default PermissionSwitches;
