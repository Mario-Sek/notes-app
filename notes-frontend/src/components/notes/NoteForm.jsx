import React, { useState, useEffect } from 'react';

const NoteForm = ({ initialData, availableTags, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: []
    });
    const [newTagName, setNewTagName] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                content: initialData.content || '',
                tags: initialData.tags || []
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 200) {
            newErrors.title = 'Title must be less than 200 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleTagToggle = (tag) => {
        const isSelected = formData.tags.some(t =>
            (t.id && tag.id && t.id === tag.id) ||
            (t.name === tag.name)
        );

        if (isSelected) {
            setFormData(prev => ({
                ...prev,
                tags: prev.tags.filter(t =>
                    (t.id && tag.id) ? t.id !== tag.id : t.name !== tag.name
                )
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
        }
    };

    const handleAddNewTag = () => {
        const trimmedName = newTagName.trim();
        if (trimmedName &&
            !availableTags.some(tag => tag.name.toLowerCase() === trimmedName.toLowerCase()) &&
            !formData.tags.some(tag => tag.name.toLowerCase() === trimmedName.toLowerCase())) {

            const newTag = { name: trimmedName };

            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag]
            }));
            setNewTagName('');
        }
    };

    const handleNewTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => {
                if (tag.id && tagToRemove.id) {
                    return tag.id !== tagToRemove.id;
                }
                return tag.name !== tagToRemove.name;
            })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            const processedData = {
                ...formData,
                tags: formData.tags.map(tag => ({
                    id: tag.id || null,
                    name: tag.name
                }))
            };

            console.log('Submitting processed data:', processedData);
            onSave(processedData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter note title"
                    className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="10"
                    placeholder="Enter note content"
                />
            </div>

            <div className="form-group">
                <label>Tags</label>

                {availableTags.length > 0 && (
                    <div className="tag-selection">
                        <p className="tag-section-title">Available Tags:</p>
                        <div className="tag-checkboxes">
                            {availableTags.map(tag => (
                                <label key={tag.id} className="tag-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.tags.some(t =>
                                            (t.id && t.id === tag.id) || t.name === tag.name
                                        )}
                                        onChange={() => handleTagToggle(tag)}
                                    />
                                    <span>{tag.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="new-tag-input">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        onKeyPress={handleNewTagKeyPress}
                        placeholder="Add new tag"
                    />
                    <button
                        type="button"
                        onClick={handleAddNewTag}
                        disabled={!newTagName.trim()}
                    >
                        Add Tag
                    </button>
                </div>
            </div>

            {formData.tags.length > 0 && (
                <div className="selected-tags">
                    <p className="tag-section-title">Selected Tags:</p>
                    <div className="tag-list">
                        {formData.tags.map((tag, index) => (
                            <span key={tag.id || `new-${index}`} className="selected-tag">
                #{tag.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="remove-tag"
                                    aria-label={`Remove ${tag.name} tag`}
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData?.title ? 'Update Note' : 'Create Note'}
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
