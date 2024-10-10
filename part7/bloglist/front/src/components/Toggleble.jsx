import {useState, forwardRef, useImperativeHandle} from 'react';
import {PropTypes} from 'prop-types';
import {Button} from 'react-bootstrap';

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? 'none' : ''};
    const showWhenVisible = {display: visible ? '' : 'none'};

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="primary" onClick={toggleVisibility} data-testid='logButton'>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="secondary" onClick={toggleVisibility}>
                    Cancel
                </Button>
            </div>
        </div>
    );
});

Togglable.displayName = 'Togglable';

export default Togglable;