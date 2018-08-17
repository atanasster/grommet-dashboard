import RoutedButton from './nextjs/RoutedButton';

export default props => (
  <RoutedButton preserveParams={['theme', 'packages']} {...props} />
);
