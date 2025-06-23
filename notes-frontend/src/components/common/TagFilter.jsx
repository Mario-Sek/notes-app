import React from 'react';

const TagFilter = ({ tags, selectedTag, onTagSelect }) => {
    return (
        <div className="tag-filter">
            <label htmlFor="tag-select">Filter by tag:</label>
            <select
                id="tag-select"
                value={selectedTag}
                onChange={(e) => onTagSelect(e.target.value)}
                className="tag-select"
            >
                <option value="">All tags</option>
                {tags.map(tag => (
                    <option key={tag.id} value={tag.name}>
                        {tag.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TagFilter;
