import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../../../actions/itemActions';
import { removeTag, updateTag } from '../../../actions/tagActions';

const TagItem = ({
	tag: { tag, id },
	updateTag,
	removeTag,
	items,
	updateItem
}) => {
	const [edit, setEdit] = useState(false);
	const [tagName, setTagName] = useState(tag);

	const onSave = () => {
		items.forEach(item => {
			if (item.tags.includes(tag)) {
				const newTags = item.tags.map(t =>
					t === tag ? (t = tagName) : t
				);
				updateItem({ ...item, tags: newTags });
			}
		});
		updateTag({ tag: tagName, id });
		setEdit(false);
	};

	const onDelete = () => {
		items.forEach(item => {
			if (item.tags.includes(tag)) {
				const newTags = item.tags.filter(t => t !== tag);
				updateItem({ ...item, tags: newTags });
			}
		});
		removeTag(id);
	};

	return edit ? (
		<li className='collection-item light-blue lighten-5'>
			<div className='row'>
				<div className='input-field col s6'>
					<input
						value={tagName}
						type='text'
						className='validate'
						onChange={e => setTagName(e.target.value)}
					/>
				</div>
				<a href='#!' className='secondary-content'>
					<i className='material-icons' onClick={onSave}>
						save
					</i>
				</a>
			</div>
		</li>
	) : (
		<li className='collection-item light-blue lighten-5'>
			<span className='flow-text' onClick={() => setEdit(true)}>
				{tagName}
			</span>
			<a href='#!' className='secondary-content'>
				<i className='material-icons' onClick={onDelete}>
					delete
				</i>
			</a>
		</li>
	);
};

TagItem.propTypes = {
	tag: PropTypes.object.isRequired,
	updateTag: PropTypes.func.isRequired,
	removeTag: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired,
	items: PropTypes.array
};

const mapStateToProps = state => ({
	items: state.item.items
});

export default connect(
	mapStateToProps,
	{ updateTag, removeTag, updateItem }
)(TagItem);
