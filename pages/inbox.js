import React from 'react';
import { withRouter } from 'next/router';
import moment from 'moment';
import { Box, Button, Text, Paragraph, InfiniteScroll, Heading, Anchor, ResponsiveContext } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import {
  Inbox, Send, Star, Document,
  Tag, Trash, Flag,
} from 'grommet-icons';

import SideMenu from '../components/SideMenu/SideMenu';
import SiteLayout from '../components/layouts/SiteLayout';
import inboxData, { emailFilters } from '../data/inbox';

const Badge = ({ label, background = 'light-3' }) => (
  <Box
    background={background}
    pad={{ horizontal: 'small' }}
    border='all'
    style={{ borderRadius: '20%' }}
  >
    <Text size='small'>
      {label}
    </Text>
  </Box>
);
class InboxPage extends React.Component {
  state = {
    selected: undefined,
  };
  static getInitialProps({ query: { kind = 'all' } }) {
    const emails = inboxData().sort((a, b) => (b.sentDate - a.sentDate));
    const filtered = emails.filter(emailFilters[kind]);
    return {
      emails,
      filtered,
      kind,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState = {}) {
    if (prevState.selected === undefined && nextProps.filtered && nextProps.filtered.length > 0) {
      return {
        selected: nextProps.filtered[0],
      };
    }
    return null;
  }
  render() {
    const { emails, filtered, kind } = this.props;
    const { selected } = this.state;
    return (
      <SiteLayout title='Inbox'>
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              direction={size && size !== 'large' ? 'column' : 'row'}
              gap='medium'
              flex={false}
              full='horizontal'
            >
              <SideMenu
                activeItem={{ id: kind }}
                width='250px'
                title='Inbox'
                items={[
                  {
                    id: 'inbox',
                    label: 'Inbox',
                    icon: <Inbox />,
                    expanded: true,
                    items: [
                      {
                        id: 'all',
                        path: '/inbox/all',
                        label: 'All',
                        widget: <Badge label={emails.filter(emailFilters.all).length} />,
                      },
                      {
                        id: 'gmail',
                        path: '/inbox/gmail',
                        label: 'GMail',
                        widget: <Badge label={emails.filter(emailFilters.gmail).length} />,
                      },
                      {
                        id: 'work',
                        path: '/inbox/work',
                        label: 'Work',
                        widget: <Badge label={emails.filter(emailFilters.work).length} />,
                      },
                      {
                        id: 'amazon',
                        path: '/inbox/amazon',
                        label: 'Amazon',
                        widget: <Badge label={emails.filter(emailFilters.amazon).length} />,
                      },
                    ],
                  },
                  {
                    id: 'sent',
                    path: '/inbox/sent',
                    label: 'Sent',
                    icon: <Send />,
                  },
                  {
                    id: 'flagged',
                    path: '/inbox/flagged',
                    label: 'Flagged',
                    icon: <Flag />,
                    widget: <Badge label={emails.filter(emailFilters.sent).length} background='accent-1' />,
                  },
                  {
                    id: 'starred',
                    path: '/inbox/starred',
                    label: 'Starred',
                    icon: <Star />,
                  },
                  {
                    id: 'drafts',
                    path: '/inbox/drafts',
                    label: 'Drafts',
                    icon: <Document />,
                  },
                  {
                   id: 'tagged',
                    path: '/inbox/tagged',
                    label: 'Tagged',
                    icon: <Tag />,
                  },
                  {
                   id: 'trash',
                    path: '/inbox/trash',
                    label: 'Trash',
                    icon: <Trash />,
                  },
                ]}
              >
                <Box pad='medium' flex={false} full='horizontal'>
                  <Button
                    primary={true}
                    label='Compose new email'
                    onClick={() => alert('New email')}
                  />
                </Box>
              </SideMenu>
              <Box flex={true} >
                <Heading level={3} margin='none'>
                  {kind}
                </Heading>
                <InfiniteScroll items={filtered} step={10} onMore={() => console.log('!!! onMore')}>
                  {(item, index) => (
                    <Box
                      key={index}
                      pad='small'
                    >
                      <Box border='bottom' gap='medium' pad={{ bottom: 'medium' }}>
                        <Anchor onClick={() => this.setState({ selected: item })}>
                          <Box direction='row' justify='between' align='center'>
                            <Text weight='bold' truncate={true}>{`${item.name} (${item.email})`}</Text>
                            <Text>{moment(item.sentDate).fromNow()}</Text>
                          </Box>
                        </Anchor>
                        <Box direction='row' gap='medium' justify='between' align='center'>
                          <Text truncate={true} weight={500}>{item.subject}</Text>
                          <Text>{item.box}</Text>
                        </Box>
                        <Paragraph
                          margin='none'
                          size='small'
                          style={{ maxWidth: '100%' }}
                        >
                          {item.content.split('\n \r')[0]}
                        </Paragraph>
                      </Box>
                    </Box>
                  )}
                </InfiniteScroll>
              </Box>
              {selected && (
                <Box basis={size === 'wide' ? 'medium' : undefined} >
                  <Box direction='row' justify='between' background='light-3' pad='small' gap='medium'>
                    <Box basis='small'>
                      <Box direction='row' justify='between'>
                        <Text weight='bold' truncate={true}>{selected.name}</Text>
                        <Text size='small'>{selected.box}</Text>
                      </Box>
                      <Text size='small' truncate={true}>{moment(selected.sentDate).format('LLL')}</Text>
                      <Text truncate={true}>{selected.subject}</Text>
                    </Box>
                    <Box>
                      <ImageStamp
                        size='large'
                        round='full'
                        src={selected.avatar}
                      />
                    </Box>
                  </Box>
                  <Paragraph margin='small'>
                    {selected.content}
                  </Paragraph>
                </Box>
              )}
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </SiteLayout>
    );
  }
}

export default withRouter(InboxPage);
