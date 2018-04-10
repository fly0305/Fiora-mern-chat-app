import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import action from '@/state/action';
import Linkman from './Linkman';

class LinkmanGroup extends Component {
    static propTypes = {
        groups: ImmutablePropTypes.list,
        defaultGroup: ImmutablePropTypes.map,
        focusGroup: PropTypes.string,
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.groups.size === 0 && nextProps.groups.size !== 0) {
            action.setFocusGroup(nextProps.groups.getIn(['0', '_id']));
        } else if (this.props.defaultGroup === null && nextProps.defaultGroup !== null) {
            action.setFocusGroup(nextProps.defaultGroup.get('_id'));
        }
    }
    renderGroup(group) {
        const groupId = group.get('_id');
        return (
            <Linkman
                key={groupId}
                name={group.get('name')}
                avatar={group.get('avatar')}
                preview="1111111111#(乖)"
                time={new Date()}
                unread={9}
                focus={this.props.focusGroup === groupId}
                onClick={action.setFocusGroup.bind(null, groupId)}
            />
        );
    }
    render() {
        const { groups, defaultGroup } = this.props;
        return (
            <div>
                {
                    defaultGroup ?
                        this.renderGroup(defaultGroup)
                        :
                        groups.map(group => (
                            this.renderGroup(group)
                        ))
                }
            </div>
        );
    }
}

export default connect(state => ({
    groups: state.getIn(['user', 'groups']) || immutable.List(),
    defaultGroup: state.get('defaultGroup'),
    focusGroup: state.get('focusGroup'),
}))(LinkmanGroup);
