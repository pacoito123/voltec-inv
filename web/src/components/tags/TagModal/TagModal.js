import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addTag } from '../../../actions/tagActions';
import TagList from '../TagList/TagList';

const TagModal = ({ addTag }) => {
	return (
		<div
			id='tag-modal'
			className='modal modal-fixed-footer light-blue lighten-4'
			style={{ overflow: 'hidden' }}
		>
			<div
				className='modal-header cyan darken-1 center'
				style={{ padding: '20px 0px 10px 0px' }}
			>
				<h4>Etiquetas</h4>
			</div>
			<div className='modal-content'>
				<ul className='collection'>
					<TagList />
				</ul>
				<div className='center'>
					<a
						href='#!'
						onClick={() => addTag({ tag: 'Nueva etiqueta' })}
						className='btn-floating btn-large waves-effect waves-light red'
					>
						<i className='material-icons'>add</i>
					</a>
				</div>
			</div>
		</div>
	);
};

TagModal.propTypes = {
	addTag: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addTag }
)(TagModal);
