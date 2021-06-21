import React from 'react';

import GenericCard from '../Components/GenericCard';
import { Button, CardDeck } from 'reactstrap';

const SignIn: React.FC = () => {
  return (
    <div>
      <CardDeck className={'App'}>
        <GenericCard
          title={'Login'}
          secondInput={{ value: '', type: 'password' }}
          firstInput={'username'}
          button={{
            text: 'Sign In',
            onSubmit: (subtitle, description) =>
              console.log('logging in with', subtitle, description),
          }}
          img={
            'https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png'
          }
        >
          <input type={'checkbox'} />
        </GenericCard>

        <GenericCard
          title={'Github Repo'}
          firstInput={'Test Repo subtitle'}
          button={{
            text: 'View more',
            onSubmit: (subtitle, description) =>
              console.log('must zoom in', subtitle, description),
          }}
          secondInput={{
            value:
              'This github repo is awesome for testing cause his description is fucking big, big like your mother!! Gotcha !!',
            type: 'textarea',
          }}
          img={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/1024px-Github-desktop-logo-symbol.svg.png'
          }
        >
          <Button placeholder={'Favorites'} />
        </GenericCard>
      </CardDeck>
    </div>
  );
};

export default SignIn;
