/* eslint-disable no-underscore-dangle */
import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import { Box, Button, Heading, Paragraph, Markdown } from 'grommet';
import SiteLayout from '../components/layouts/SiteLayout';
import DocProperty from '../components/components/DocProperty';
import Example from '../components/components/Example';

class Doc extends React.Component {
  state = {
    documentation: {},
  };
  componentDidMount() {
    const { router: { query: { component, library } } } = this.props;
    window.scrollTo(0, 0);
    fetch(`https://grommet-nextjs.herokuapp.com/api/examples/${library}/${component}`)
      .then(res => (res ? res.json() : res))
      .catch(() => this.setState({ documentation: {} }))
      .then(res => res && res.length &&
        this.setState({ documentation: res.length > 0 ? res[0] : res }));
  }
  render() {
    const { router: { query: { component } } } = this.props;
    const { documentation } = this.state;
    const { examples = {}, doc = {} } = documentation;
    return (
      <SiteLayout
        title={component}
      >
        <Box pad={{ horizontal: 'large', top: 'large' }}>
          <Box direction='row-responsive'>
            <Box margin={{ vertical: 'large' }} basis='1/2' align='start'>
              <Heading level={1}>
                <strong>{component}</strong>
              </Heading>
              {doc && (
                <Paragraph size='large'>
                  {doc.description}
                </Paragraph>
              )}
              {(doc && doc.availableAt) ? (
                <Button href={doc.availableAt.url} target='_blank' >
                  {typeof doc.availableAt.badge === 'string' ? <img alt='Example badge' src={doc.availableAt.badge} /> : doc.availableAt.badge}
                </Button>
              ) : null}
            </Box>
            {examples._starter && (
              <Box flex={true} pad={{ vertical: 'large' }} align='center'>
                <Example code={examples._starter} component={component} example='_starter' />
              </Box>
            )}
          </Box>
        </Box>

        {doc ? (
          <Box pad={{ horizontal: 'large', bottom: 'large' }}>
            { doc.usage && (
              <Box pad='large' round='large' margin='small' background='light-2'>
                <Heading margin='none' level={3}><strong>Usage</strong></Heading>
                <Markdown>{`\`\`\`${doc.usage}\`\`\``}</Markdown>
              </Box>
            )}
            {doc.properties && (
              <Box pad='large' round='large' background='light-1'>
                {doc.properties.map(property => (
                  <DocProperty
                    key={property.name}
                    property={property}
                    code={examples[property.name]}
                    component={component}
                    example={property.name}
                  />
                ))}
              </Box>
            )}
          </Box>
        ) : null}
      </SiteLayout>
    );
  }
}


export default withRouter(Doc);
