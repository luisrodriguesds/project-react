import React from 'react';

import GenericCard from '../Components/GenericCard';
// import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <div>
      <GenericCard
        title={'Login'}
        description={{
          value: 'Something description like really very big',
          type: 'textarea',
        }}
        img={'https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png'}
        subtitle={'username'}
      />
    </div>
  );
};

export default SignIn;
