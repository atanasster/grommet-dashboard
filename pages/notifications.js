import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Box, Button, Table, TableBody, TableCell, TableRow } from 'grommet';
import { Notification } from 'grommet-controls';
import connect from '../redux/index';
import { addStatus } from '../redux/notifications/actions';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import Modal from '../components/Modal/Modal';

const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid;
`;

const StyledTableCell = styled(TableCell)`
  padding: 10px;
`;

const StatusNotification = ({ status, addStatusProp }) => (
  <StyledTableRow>
    <StyledTableCell>
      {`Notification status '${status}'`}
    </StyledTableCell>
    <StyledTableCell>
      <Box direction='row' fill='horizontal'>
        <Button label='Show top' onClick={() => addStatusProp(`${status} message`, status)} />
      </Box>
    </StyledTableCell>
  </StyledTableRow>
);
const FullNotification = ({ status }) => (
  <StyledTableRow>
    <StyledTableCell>
      {`Notification status '${status}'`}
    </StyledTableCell>
    <StyledTableCell>
      <Notification
        border={{ side: 'all', color: 'brand', size: 'medium' }}
        message='Notification'
        state={`status: ${status}`}
        timestamp={new Date()}
        strong={true}
        percentComplete={30}
        status={status}
        onClose={() => alert('Close clicked')}
      />
    </StyledTableCell>
  </StyledTableRow>
);
class NotificationsPage extends React.Component {
  state = {
    layer: undefined,
  };
  render() {
    const { addStatus: addStatusProp } = this.props;
    const { layer } = this.state;
    let modal;
    if (layer !== undefined) {
      modal = (
        <Modal
          title='Confirm'
          content='Are you sure you want to close this layer?'
          position={layer}
          onClose={() => this.setState({ layer: undefined })}
        />
      );
    }
    const LayerNotification = ({ position }) => (
      <StyledTableRow>
        <StyledTableCell>
          {`Modal '${position}'`}
        </StyledTableCell>
        <StyledTableCell>
          <Box direction='row' fill='horizontal'>
            <Button label='Show modal' onClick={() => this.setState({ layer: position })} />
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    );

    return (
      <SiteLayout title='Notifications'>
        {modal}
        <Box margin={{ bottom: 'large' }}>
          <Title label='Site notifications' />
          <Table>
            <TableBody>
              <StatusNotification status='info' addStatusProp={addStatusProp} />
              <StatusNotification status='ok' addStatusProp={addStatusProp} />
              <StatusNotification status='warning' addStatusProp={addStatusProp} />
              <StatusNotification status='error' addStatusProp={addStatusProp} />
              <StatusNotification status='disabled' addStatusProp={addStatusProp} />
            </TableBody>
          </Table>
        </Box>
        <Box margin={{ bottom: 'large' }}>
          <Title label='Layer notifications' />
          <Table>
            <TableBody>
              <LayerNotification position='center' />
              <LayerNotification position='left' />
              <LayerNotification position='right' />
              <LayerNotification position='top' />
              <LayerNotification position='bottom' />
            </TableBody>
          </Table>
        </Box>

        <Box margin={{ bottom: 'large' }}>
          <Title label='Full notifications' />
          <Table>
            <TableBody>
              <FullNotification status='info' />
              <FullNotification status='ok' />
              <FullNotification status='warning' />
              <FullNotification status='error' />
              <FullNotification status='disabled' />
            </TableBody>
          </Table>
        </Box>
      </SiteLayout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addStatus }, dispatch);


export default connect(null, mapDispatchToProps)(NotificationsPage);

