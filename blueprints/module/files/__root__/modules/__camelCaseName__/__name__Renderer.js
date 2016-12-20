import React from 'react';

import './<%= pascalEntityName %>.scss';

export default function(props, state) {
    return (
        <div className="<%= pascalEntityName %>Component">
            <p className="text">
                <%= pascalEntityName %> Component %>
            </p>
        </div>
    );
}
