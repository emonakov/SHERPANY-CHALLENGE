import { FC } from 'react';
import { Anchor, Header, Nav } from 'grommet';
import { NavLink as NavLinkUnstyled } from 'react-router-dom';
import styled from 'styled-components';

const StickyHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const NavLink = styled(NavLinkUnstyled)`
  color: ${({ theme }) => theme.global.colors['dark-6']};

  &.active {
    color: ${({ theme }) => theme.global.colors['accent-1']};
  }
`;

const Navigation: FC = () => (
  <StickyHeader background="dark-1" pad="small">
    <Nav direction="row">
      <Anchor as="span" a11yTitle="navigate to home page">
        <NavLink to="/" exact>
          Home
        </NavLink>
      </Anchor>
      <Anchor as="span" a11yTitle="navigate to settings">
        <NavLink to="/settings" exact>
          Settings
        </NavLink>
      </Anchor>
    </Nav>
  </StickyHeader>
);

export default Navigation;
